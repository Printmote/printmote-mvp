import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { formData } = await request.json()

    // 1. Verify environment variables
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      throw new Error("Missing Notion configuration")
    }

    // 2. Prepare Notion API payload
    const notionPayload = {
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        "Name": {
          title: [
            {
              text: {
                content: formData.fullName || "No name provided"
              }
            }
          ]
        },
        "Email": {
          email: formData.email || null
        },
        "Phone": {
          phone_number: formData.phoneNumber || null
        },
        "Print Type": {
          select: {
            name: formData.printType || "Not specified"
          }
        },
        "Quantity": {
          number: Number(formData.quantity) || 0
        },
        "Total Cost": {
          number: Number(formData.totalCost) || 0
        },
        "Status": {
          status: {
            name: "New Order"
          }
        }
      }
    }

    // 3. Send to Notion API
    const notionResponse = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify(notionPayload)
    })

    if (!notionResponse.ok) {
      const errorData = await notionResponse.json()
      throw new Error(`Notion API error: ${JSON.stringify(errorData)}`)
    }

    const result = await notionResponse.json()
    console.log("Successfully created Notion page:", result.id)

    return NextResponse.json({
      success: true,
      notionPageId: result.id
    })

  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}