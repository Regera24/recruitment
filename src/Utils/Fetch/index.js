export const fetchData = async (api) => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addData = async (api, newData) => {
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

export const updateData = async (api, id, updatedData) => {
  try {
    const response = await fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const deleteData = async (api, id) => {
  try {
    await fetch(`${api}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export const checkLogin = async (url, email, password) => {
  try {
    const response = await fetch(`${url}?email=${email}&password=${password}`);
    const data = await response.json();
    if (data.length > 0) {
      return data[0]; 
    } else {
      return null; 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi kiểm tra đăng nhập:', error);
    return null;
  }
};