export const keyExists = (obj: any, key: any) => {
  if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
    return false;
  } else if (obj.hasOwnProperty(key)) {
    return true;
  } else if (Array.isArray(obj)) {
    for (const element of obj) {
      const result: any = keyExists(element, key);
      if (result) {
        return result;
      }
    }
  } else {
    for (const k in obj) {
      const result: any = keyExists(obj[k], key);
      if (result) {
        return result;
      }
    }
  }

  return false;
};

export const capitalizeFirstLetter = (string: any) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const dateTemplate = (timestamp: string) => {
  const date = timestamp ? new Date(Number(timestamp)) : new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return ` ${hours}:${minutes}`;
};

export const assignLabels = (
  value: number | null | string,
  type: [{ label: string; value: number | string }]
) => {
  return type?.find((x: any) => x.value === value)?.label;
};

export const dateTimeTemplate = (options: any) => {
  const date = new Date(Number(options)).toLocaleString();
  return date;
};

export const getUserName = (user: any) => {
  if (!user?.first_name && !user?.last_name) {
    return "No name";
  }
  return `${user?.first_name} ${user?.last_name}`;
};
