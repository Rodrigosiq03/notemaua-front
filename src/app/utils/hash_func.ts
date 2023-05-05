import crypto from 'crypto';


function hashString(str: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
}

export { hashString }
