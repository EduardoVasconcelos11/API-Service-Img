export const validateUploadData = (data: any) => {
    if (!data.customer_code || !data.measure_type || !data.image) {
      throw { statusCode: 400, code: "INVALID_DATA", message: "Dados inválidos" };
    }
  };
  
  export const validateConfirmData = (data: any) => {
    if (!data.measure_uuid || !data.confirmed_value) {
      throw { statusCode: 400, code: "INVALID_DATA", message: "Dados inválidos" };
    }
  };
  