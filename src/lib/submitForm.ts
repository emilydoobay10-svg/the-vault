export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

type ApiResponse = {
  ok?: boolean;
  error?: string;
};

function isApiResponse(value: unknown): value is ApiResponse {
  return typeof value === 'object' && value !== null;
}

export async function submitForm(
  endpoint: string,
  data: Record<string, string>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return {
        ok: false,
        error: 'Form submission failed. The server did not respond correctly. Please try again.',
      };
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      return {
        ok: false,
        error: 'Form submission failed. The server returned an invalid response. Please try again.',
      };
    }

    if (!isApiResponse(body)) {
      return {
        ok: false,
        error: 'Form submission failed. The server returned an invalid response. Please try again.',
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        error: body.error ?? 'Something went wrong. Please try again.',
      };
    }

    if (body.ok !== true) {
      return {
        ok: false,
        error: 'Form submission failed. The server returned an invalid response. Please try again.',
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'Network error. Check your connection and try again.',
    };
  }
}
