export async function uploadFighterPicture(file: File, fighterId: string) {
  if (!file || !fighterId) {
    throw new Error("File and fighterId are required");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fighterId", fighterId);

  const res = await fetch("/api/fighters/upload-picture", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to upload picture: ${res.statusText}`);
  }

  return await res.text();
}
