import { NextResponse } from "next/server";
import { storage } from "@/config/firebase.config";

async function deleteAllFilesInBucket(): Promise<void> {
  const bucket = storage.bucket();

  const [files] = await bucket.getFiles();

  if (files.length === 0) {
    console.log('No files found in the bucket.');
    return;
  }

  const deletePromises = files.map(file => 
    file.delete()
      .then(() => console.log(`Deleted file: ${file.name}`))
      .catch((error) => console.error(`Failed to delete file: ${file.name}`, error))
  );

  await Promise.all(deletePromises);
  console.log('All files in the storage bucket have been deleted.');
}

export async function GET() {
  try {
    await deleteAllFilesInBucket();

    return NextResponse.json({ message: "All files deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error during deletion:', error);
    return NextResponse.json({ error: "Failed to delete files" }, { status: 500 });
  }
}
