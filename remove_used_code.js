
async function removeUsedCode(usedCode) {
  const token = "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";
  const username = "mo83483";
  const repo = "mohamedsadekxbet";
  const branch = "main";
  const filePath = "codes.json";

  const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;

  // Step 1: Get current content and SHA
  const getRes = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json"
    }
  });

  const getData = await getRes.json();
  const content = JSON.parse(atob(getData.content));
  
  // Step 2: Remove used code
  content.codes = content.codes.filter(c => c.code !== usedCode);

  const updatedContent = btoa(JSON.stringify(content, null, 2));

  // Step 3: Push updated content
  const res = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json"
    },
    body: JSON.stringify({
      message: `Remove used code ${usedCode}`,
      content: updatedContent,
      sha: getData.sha,
      branch: branch
    })
  });

  if (res.ok) {
    alert("✅ تم الشحن والكود تم حذفه من GitHub!");
  } else {
    alert("❌ حدث خطأ أثناء حذف الكود.");
  }
}
