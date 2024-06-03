import { connect } from '@/app/libs/mongodb'
import Numbers from '@/app/models/counter';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  await connect();
  const number = await Numbers.findOne({_id: id})
  return NextResponse.json({ number }, { status: 200 })
}

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
  const { id } = params;
  const { number } = await request.json();
  await connect();
  const result = await Numbers.findByIdAndUpdate(id, { number });
  return NextResponse.json({ message: `number updated ${result}` }, { status: 200 })
}
