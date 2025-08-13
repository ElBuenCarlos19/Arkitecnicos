import { NextResponse } from 'next/server'
import { getProductsCategory } from '@/lib/db/products_category'
import { signUp } from '@/lib/db/auth'
export async function GET(request: Request) {
  const products = await getProductsCategory()

  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const { email, password, full_name, username } = await request.json()
  const user = await signUp(email, password, full_name, username)
  return NextResponse.json(user)

}