'use server';

export const manageUserData = async (
  url: string,
  payload: Record<string, unknown>,
) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};

export const getDataFromDB = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return data;
};

export const postToDB = async (
  url: string,
  payload: Record<string, unknown> | FormData,
) => {
  console.log('Post req 1');

  const body = payload instanceof FormData ? payload : JSON.stringify(payload);

  console.log('Post req 2');

  const response = await fetch(url, {
    method: 'POST',
    body,
    headers:
      payload instanceof FormData
        ? undefined
        : { 'Content-Type': 'application/json' },
  });

  console.log('Post req 3');

  // Todo: remove later
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error:', errorText);
    throw new Error('Failed to POST to ' + url);
  }

  console.log('Post req 4');

  const result = await response.json();

  return result;
};

export const updateDataIntoDB = async (
  url: string,
  payload?: Record<string, unknown>,
) => {
  console.log(JSON.stringify(payload));

  let response;

  if (payload) {
    response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } else {
    response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const result = await response.json();

  return result;
};

export const deleteDataFromDB = async (
  url: string,
  productId?: Record<string, string>,
) => {
  let response;

  if (productId) {
    response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productId),
    });
  } else {
    response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const result = await response.json();

  return result;
};
