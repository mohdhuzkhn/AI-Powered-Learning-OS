import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { requireStorage } from '../../../infrastructure/firebase/requireStorage';

/**
 * Uploads a submission screenshot and returns its download URL.
 *
 * Path must match storage.rules' `submissions/{studentId}/{assignmentId}/{fileName}`
 * exactly, or the upload gets rejected by Storage security rules
 * regardless of what this function intends.
 */
export const ScreenshotStorage = {
  async upload(studentId: string, assignmentId: string, file: File): Promise<string> {
    const storage = requireStorage();
    const extension = file.name.split('.').pop() ?? 'png';
    const path = `submissions/${studentId}/${assignmentId}/screenshot.${extension}`;
    const fileRef = ref(storage, path);

    await uploadBytes(fileRef, file, { contentType: file.type });
    return getDownloadURL(fileRef);
  },
};
