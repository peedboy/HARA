// HTML 요소들
const researchList = document.getElementById("researchList");
const tagFilter = document.getElementById("tagFilter");

// 로컬 저장소에서 연구 데이터를 가져오는 함수
function getResearchData() {
  const data = localStorage.getItem("researchData");
  return data ? JSON.parse(data) : [];
}

// 화면에 연구 목록을 렌더링하는 함수
function renderResearchList(filterTag = "all") {
  const researchData = getResearchData();
  researchList.innerHTML = ''; // 기존 목록 초기화

  // 태그 필터링
  const filteredData = researchData.filter(entry => filterTag === "all" || entry.tag === filterTag);

  filteredData.forEach(entry => {
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

// 태그 필터 변경 시 이벤트 처리
tagFilter.addEventListener("change", function() {
  const selectedTag = tagFilter.value;
  renderResearchList(selectedTag);
});

// 페이지 로드 시 연구 목록 표시
window.onload = function() {
  renderResearchList(); // 모든 태그의 글을 표시
};

