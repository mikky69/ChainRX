import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const {
      fullName,
      email,
      phone,
      institution,
      department,
      researchFocus,
      yearsOfExperience,
      orcidId,
      areasOfInterest,
      researchDescription,
    } = await request.json();

    // Validate required fields
    if (!fullName || !email || !institution || !researchFocus) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if researcher already exists
    const existingResearcher = await prisma.researcher.findUnique({
      where: { email },
    });

    if (existingResearcher) {
      return NextResponse.json(
        { error: 'Researcher with this email already exists' },
        { status: 400 }
      );
    }

    // Create researcher in database
    const researcher = await prisma.researcher.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        institution,
        department: department || null,
        researchFocus,
        yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
        orcidId: orcidId || null,
        areasOfInterest: areasOfInterest || [],
        researchDescription: researchDescription || null,
        status: 'pending_approval',
      },
    });

    // In a real application, you might want to:
    // 1. Send a welcome email
    // 2. Notify admin for approval
    // 3. Create a user account if needed

    return NextResponse.json(
      { 
        success: true, 
        message: 'Researcher profile submitted for approval',
        researcherId: researcher.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating researcher profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
