// 페이지 로드 시 저장된 데이터 불러오기
window.onload = function() {
    loadActivity1();
    loadActivity2();
    loadActivity3();
};

// 휴대폰 부품 정보 표시
function showInfo(id) {
    const infoElements = document.querySelectorAll('.component-info');
    infoElements.forEach(el => {
        el.style.display = 'none';
    });
    
    const infoElement = document.getElementById('info-' + id);
    if (infoElement) {
        infoElement.style.display = 'block';
    }
}

// 드래그 앤 드롭 기능
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    
    // 복제본 생성
    const clone = draggedElement.cloneNode(true);
    clone.id = data + "-clone";
    
    // 드롭 영역에 추가
    ev.target.appendChild(clone);
    
    // 원본 숨기기
    draggedElement.style.display = 'none';
    
    // 순위 저장
    saveActivity2();
}

// 저장 기능
function saveActivity1() {
    const inputs = document.querySelectorAll('.table-container input');
    const data = [];
    
    inputs.forEach(input => {
        data.push(input.value);
    });
    
    localStorage.setItem('phonePartsData', JSON.stringify(data));
    alert("휴대폰 부품 정보가 저장되었습니다!");
}

function loadActivity1() {
    const savedData = localStorage.getItem('phonePartsData');
    if (savedData) {
        const data = JSON.parse(savedData);
        const inputs = document.querySelectorAll('.table-container input');
        
        inputs.forEach((input, index) => {
            if (data[index]) {
                input.value = data[index];
            }
        });
    }
}

function saveActivity2() {
    const rankedItems = document.querySelectorAll('#ranked-list .attitude-item');
    const rankings = [];
    
    rankedItems.forEach(item => {
        // ID에서 숫자 추출 (attitude1-clone => 1)
        const id = item.id.split('-')[0].replace('attitude', '');
        rankings.push(id);
    });
    
    localStorage.setItem('attitudeRankings', JSON.stringify(rankings));
}

function loadActivity2() {
    const savedRankings = localStorage.getItem('attitudeRankings');
    if (savedRankings) {
        const rankings = JSON.parse(savedRankings);
        const rankedList = document.getElementById('ranked-list');
        
        // 기존에 드래그된 항목 상태 복원
        rankings.forEach(id => {
            const originalItem = document.getElementById('attitude' + id);
            if (originalItem) {
                // 원본을 숨김
                originalItem.style.display = 'none';
                
                // 복제본 생성하여 랭킹 리스트에 추가
                const clone = originalItem.cloneNode(true);
                clone.id = originalItem.id + '-clone';
                rankedList.appendChild(clone);
            }
        });
    }
}

function saveActivity3() {
    const definition = document.getElementById('global-citizen-definition').value;
    localStorage.setItem('globalCitizenDefinition', definition);
    alert("세계시민 정의가 저장되었습니다!");
}

function loadActivity3() {
    const savedDefinition = localStorage.getItem('globalCitizenDefinition');
    if (savedDefinition) {
        document.getElementById('global-citizen-definition').value = savedDefinition;
    }
}

// 정보 초기화
function resetAllData() {
    if (confirm('모든 저장된 데이터를 삭제하시겠습니까?')) {
        localStorage.removeItem('phonePartsData');
        localStorage.removeItem('attitudeRankings');
        localStorage.removeItem('globalCitizenDefinition');
        location.reload();
    }
} 