import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/lib/payload'

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  updatedAt: string;
  createdAt: string;
}

interface CategoryInput {
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

interface PayloadWrapper {
  _payload?: string;
}

interface QueryParams {
  depth?: string;
  limit?: string;
  page?: string;
  sort?: string;
  'select[name]'?: string;
  [key: string]: string | undefined;
}

async function handleGetCategories() {
  try {
    const payload = await getPayloadClient()

    const categories = await payload.find({
      collection: 'categories',
      depth: 0,
    })
    return NextResponse.json({
      success: true,
      docs: categories.docs,
    })
  } catch (error: unknown) {
    console.error('Categories API GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return handleGetCategories()
}

export async function POST(request: Request) {
  try {
    const payload = await getPayloadClient()
    let body: CategoryInput | PayloadWrapper | QueryParams;
    const contentType = request.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      body = await request.json() as CategoryInput | PayloadWrapper | QueryParams;
    } else if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData()
      body = Object.fromEntries(formData.entries()) as CategoryInput | PayloadWrapper | QueryParams;
    } else {
      const textBody = await request.text()
      try {
        body = JSON.parse(textBody) as CategoryInput | PayloadWrapper | QueryParams;
      } catch (e) {
        const params = new URLSearchParams(textBody)
        body = Object.fromEntries(params.entries()) as QueryParams;
      }
    }

    if (body && typeof (body as PayloadWrapper)._payload === 'string') {
      try {
        body = JSON.parse((body as PayloadWrapper)._payload as string) as CategoryInput;
      } catch (e) {
        console.error('Failed to parse _payload string:', e)
      }
    }

    const queryParamsBody = body as QueryParams;
    if (
      !('name' in body) &&
      !('slug' in body) &&
      (queryParamsBody.depth || queryParamsBody.limit || queryParamsBody.page || queryParamsBody.sort || queryParamsBody['select[name]'])
    ) {
      console.warn(
        'POST request to /api/categories received with GET-like parameters. Handling as GET request.'
      )
      return handleGetCategories()
    }

    const newCategory = await payload.create({
      collection: 'categories',
      data: body as CategoryInput,
    })

    return NextResponse.json({
      success: true,
      data: newCategory,
    })
  } catch (error: unknown) {
    console.error('Create category error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await getPayloadClient()
    const body = (await request.json()) as { id: string } & Partial<CategoryInput>
    const { id, ...updateData } = body

    const updatedCategory = await payload.update({
      collection: 'categories',
      id,
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: updatedCategory,
    })
  } catch (error: unknown) {
    console.error('Update category error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const payload = await getPayloadClient()
    const { searchParams } = new URL(request.url)

    let idsToDelete: string[] = []
    const idParam = searchParams.get('id')

    if (idParam) {
      idsToDelete.push(idParam)
    } else {
      const whereInIds: string[] = []
      for (const [key, value] of searchParams.entries()) {
        if (key.startsWith('where[id][in][') && key.endsWith(']')) {
          whereInIds.push(value)
        }
      }
      if (whereInIds.length > 0) {
        idsToDelete = whereInIds
      }
    }

    if (idsToDelete.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category ID(s) or a valid "where" clause for deletion are required',
        },
        { status: 400 }
      )
    }

    if (idsToDelete.length > 1) {
      await payload.delete({
        collection: 'categories',
        where: {
          id: {
            in: idsToDelete,
          },
        },
      })
    } else {
      await payload.delete({
        collection: 'categories',
        id: idsToDelete[0],
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Category(ies) deleted successfully',
    })
  } catch (error: unknown) {
    console.error('Delete category error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
