interface DonorData {
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  dateOfBirth: Date;
  gender: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Fetch all donors with pagination and search
export async function getDonors(params?: QueryParams) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.search) searchParams.set('search', params.search);

  const response = await fetch(`/api/donors?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch donors');
  }
  return response.json();
}

// Fetch a single donor
export async function getDonor(id: string) {
  const response = await fetch(`/api/donors/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch donor');
  }
  return response.json();
}

// Create a new donor
export async function createDonor(data: DonorData) {
  const response = await fetch('/api/donors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create donor');
  }
  return response.json();
}

// Update a donor
export async function updateDonor(id: string, data: Partial<DonorData>) {
  const response = await fetch(`/api/donors/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update donor');
  }
  return response.json();
}

// Delete a donor
export async function deleteDonor(id: string) {
  const response = await fetch(`/api/donors/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete donor');
  }
  return response.json();
}