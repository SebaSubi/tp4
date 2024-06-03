import Counter from '@/app/components/Counter';
import { connect } from '@/app/libs/mongodb'
import Counters from '@/app/models/counter';
import { NextRequest, NextResponse } from 'next/server'

export interface Params {
  id: string;
}


export async function POST(request: NextRequest) {
  const { number, colour } = await request.json(); 
  await connect();
  const newNumber = await Counters.create({ number, colour });
  return NextResponse.json({message: "Number created", _id: newNumber._id, colour: newNumber.colour }, { status: 201 });
}

export async function GET() {
  await connect();
  const number = await Counters.find();
  return NextResponse.json({ number })
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connect();
  await Counters.findByIdAndDelete(id)
  return NextResponse.json({ message: "instance Deleted"}, { status: 200 })
}

