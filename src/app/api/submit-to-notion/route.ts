// src/app/api/submit-to-notion/route.ts
import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function POST(request: Request) {
  try {
    const { formData } = await request.json()

    // Log environment variables and formData for debugging
    console.log('NOTION_API_KEY:', process.env.NOTION_API_KEY)
    console.log('NOTION_PRINT_REQUESTS_DB_ID:', process.env.NOTION_PRINT_REQUESTS_DB_ID)
    console.log('Received formData:', formData)

    // Validate required fields
    if (!formData?.fullName || !formData?.email) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400 }
      )
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
            // Use one of these exact values from your Notion database
            name: 'Not started' // or 'Pending', 'In Progress', etc.
          }
        },
        'Date Submitted': {
          date: {
            start: new Date().toISOString()
          }
        }
      }
    })

    // Type-safe response handling
    if ('url' in response) {
      return NextResponse.json({
        success: true,
        notionPageUrl: response.url,
        pageId: response.id
      })
    }

    throw new Error('Unexpected response from Notion API')

  } catch (error) {
    console.error('Notion API error:', error)
    return NextResponse.json(
      { error: 'Failed to create print request' },
      { status: 500 }
    )
  }
}