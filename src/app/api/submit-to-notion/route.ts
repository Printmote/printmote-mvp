// src/app/api/submit-to-notion/route.ts
import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    // Validate required fields
    if (!formData?.fullName || !formData?.email) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400 }
      );
    }

    // Upload file to Supabase Storage if present
    let fileUrl = null;
    if (formData.designFile) {
      const { name, type, base64 } = formData.designFile;
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = createClient();
      const buffer = Buffer.from(base64, 'base64');
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('requestFiles')
        .upload(`${Date.now()}_${name}`, buffer, {
          contentType: type,
          upsert: false,
        });
      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 400 });
      }
      // Use public URL for Notion, not signed URL
      fileUrl = supabase.storage.from('requestFiles').getPublicUrl(uploadData.path).data.publicUrl;
    }

    // Create new row in "print requests" database
    const response = await notion.pages.create({
      parent: { 
        database_id: process.env.NOTION_PRINT_REQUESTS_DB_ID! // New env variable
      },
      properties: {
        'Name': {
          title: [
            {
              text: {
                content: formData.fullName || 'No name provided'
              }
            }
          ]
        },
        'Email': {
          email: formData.email || null
        },
        'Phone': {
          phone_number: formData.phoneNumber || null
        },
        'Print Type': {
          select: {
            name: formData.printType || 'Not specified'
          }
        },
        'Size': {
          rich_text: [
            {
              text: {
                content: formData.size || 'Not specified'
              }
            }
          ]
        },
        'Quantity': {
          number: Number(formData.quantity) || 0
        },
        'Total Cost': {
          number: parseFloat(formData.totalCost) || 0
        },
        'Status': {
          status: {
            name: 'Not started'
          }
        },
        'Date Submitted': {
          date: {
            start: new Date().toISOString()
          }
        },
        'uploadedFiles': fileUrl
          ? {
              files: [
                {
                  name: formData.designFile?.name || 'Uploaded File',
                  type: 'external',
                  external: { url: fileUrl },
                },
              ],
            }
          : { files: [] },
      }
    });

    if ('url' in response) {
      return NextResponse.json({
        success: true,
        notionPageUrl: response.url,
        pageId: response.id
      });
    }

    throw new Error('Unexpected response from Notion API');

  } catch (error) {
    console.error('Notion API error:', error);
    return NextResponse.json(
      { error: 'Failed to create print request' },
      { status: 500 }
    );
  }
}