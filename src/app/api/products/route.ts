import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

//GET /api/products
export async function GET(){
  // Step 1: Ask the warehouse (supabase)  for all products
  const { data, error} = await supabase.from('products').select('*')

  // Step 2: If there's an error (e.g RLS denied it), return an error
  if(error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Step 3: Otherwise, return the product list to the user
  return NextResponse.json(data)
}