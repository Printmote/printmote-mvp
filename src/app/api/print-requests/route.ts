import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const data = await request.json()

  const { error } = await supabase
    .from('print_requests')
    .insert([
      {
        customer_name: data.name,
        phone_number: data.phone,
        request_type: data.type,
        details: data.details,
        status: 'pending'
      }
    ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ message: 'Print request submitted successfully' })
}

export async function GET() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('print_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
} 