//! hash

import bcrypt from "bcryptjs";

export const hash = async (password: string) => {
  try {
    //salt
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
};

export const compare = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw error;
  }
};
