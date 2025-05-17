const form = document.getElementById("researchForm");

// 로컬 저장소에서 연구 데이터를 가져오는 함수
function getResearchData() {
  const data = localStorage.getItem("researchData");
  return data ? JSON.parse(data) : [];
}

// 로컬 저장소에 연구 데이터를 저장하는 함수
function saveResearchData(data) {
  localStorage.setItem("researchData", JSON.stringify(data));
}

// 업로드 폼 제출 이벤트 처리
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const school = formData.get("school");
  const category = formData.get("category");
  const tag = formData.get("tag");
  const abstract = formData.get("abstract");
  const file = formData.get("file");

  // 임시 URL 생성 (실제로 파일을 서버에 업로드하려면 서버측 구현이 필요)
  const fileUrl = URL.createObjectURL(file);
  const filename = file.name;

  const newResearch = {
    title,
    author,
    school,
    category,
    tag,
    abstract,
    fileUrl,
    filename
  };

  // 기존 데이터와 합쳐서 새로운 데이터 저장
  const researchData = getResearchData();
  researchData.unshift(newResearch); // 새 글이 맨 위에 오도록
  saveResearchData(researchData);

  // 폼 초기화
  form.reset();

  // 홈 페이지로 리다이렉트
  window.location.href = "home.html";
});
