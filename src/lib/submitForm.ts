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
  console.log('[submitForm] starting request', { endpoint, fields: Object.keys(data) });

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
    console.log('[submitForm] response received', {
      endpoint,
      status: response.status,
      ok: response.ok,
      contentType,
    });

    if (!contentType.includes('application/json')) {
      console.error('[submitForm] non-JSON response', { endpoint, status: response.status, contentType });
      return {
        ok: false,
        error: 'Form submission failed. The server did not respond correctly. Please try again.',
      };
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch (parseError) {
      console.error('[submitForm] JSON parse failed', { endpoint, parseError });
      return {
        ok: false,
        error: 'Form submission failed. The server returned an invalid response. Please try again.',
      };
    }

    console.log('[submitForm] parsed response body', { endpoint, body });

    if (!isApiResponse(body)) {
      console.error('[submitForm] invalid response shape', { endpoint, body });
      return {
        ok: false,
        error: 'Form submission failed. The server returned an invalid response. Please try again.',
      };
    }

    if (!response.ok) {
      console.error('[submitForm] HTTP error response', { endpoint, status: response.status, body });
      return {
        ok: false,
        error: body.error ?? 'Something went wrong. Please try again.',
      };
    }

    if (body.ok !== true) {
      console.error('[submitForm] missing ok:true in success response', { endpoint, body });
      return {
        ok: false,
        error: 'Form submission failed. The server returned an invalid response. Please try again.',
      };
    }

    console.log('[submitForm] success', { endpoint });
    return { ok: true };
  } catch (error) {
    console.error('[submitForm] network/request failed', { endpoint, error });
    return {
      ok: false,
      error: 'Network error. Check your connection and try again.',
    };
  }
}
