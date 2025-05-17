// HTML 요소들
const form = document.getElementById("researchForm");
const researchList = document.getElementById("researchList");

// 로컬 저장소에서 연구 데이터를 가져오는 함수
function getResearchData() {
  const data = localStorage.getItem("researchData");
  return data ? JSON.parse(data) : [];
}

// 로컬 저장소에 연구 데이터를 저장하는 함수
function saveResearchData(data) {
  localStorage.setItem("researchData", JSON.stringify(data));
}

// 화면에 연구 목록을 렌더링하는 함수
function renderResearchList() {
  const researchData = getResearchData(); // 로컬 저장소에서 데이터를 가져옴
  researchList.innerHTML = ''; // 기존 목록 초기화

  researchData.forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <h3>${entry.title}</h3>
      <p><strong>${entry.author}</strong> (${entry.school}) / 분야: ${entry.category}</p>
      <p>${entry.abstract}</p>
      <a href="${entry.fileUrl}" target="_blank">📄 ${entry.filename}</a>
    `;
    researchList.appendChild(div);
  });
}

// 업로드 폼 제출 이벤트 처리
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const school = formData.get("school");
  const category = formData.get("category");
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

  // 최근 연구 목록 업데이트
  renderResearchList();
});

// 페이지 로드 시 최근 연구 목록 표시
window.onload = renderResearchList;
