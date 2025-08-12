import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const data = await request.json();

    // Upload file to Supabase Storage if present
    let fileUrl = null;
    if (data.file) {
      const { name, type, base64 } = data.file;
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
      fileUrl = supabase.storage.from('requestFiles').getPublicUrl(uploadData.path).data.publicUrl;
    }

    const { error } = await supabase
      .from('requests')
      .insert([
        {
          name: data.name,
          email: data.email,
          printType: data.printType,
          size: data.size,
          quantity: data.quantity,
          deliveryType: data.deliveryType,
          date_submit: data.date_submit,
          phone: data.phone,
          totalCost: data.totalCost,
          status: data.status || 'pending',
          files: fileUrl || null,
        }
      ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Request submitted successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
