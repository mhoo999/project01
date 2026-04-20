# Project: 키즈 테마파크 프랜차이즈 퍼블리싱

## 개요
- 클라이언트 의뢰 반응형 웹 퍼블리싱 (PC/모바일 2단계)
- 납기: 2026-04-22 오전
- 비용: 100,000원 (반응형 deluxe 기준, 4000px 추가금 없음 - 첫 손님 배려)
- 수정: 1회 무료, 이후 건당 10,000원

## 폰트
- 타이틀: 감탄로드탄탄체 (GamtanRoadTantanTTF) - CDN 웹폰트
- 본문: Pretendard - CDN 웹폰트

## 포인트 컬러
- 오렌지: #FF6136
- 블루(그래프): #3B6EF8 / #5B8BF5

## 섹션 구조

### 1. Hero
- 풀스크린 배경 이미지 (PC: hero_pc.jpg / 모바일: hero_mo.jpg)

### 2. Activity (슬라이더)
- 타이틀 + 바디 텍스트
- 이미지 슬라이더: PC 2장씩, 모바일 1장씩, 한 칸씩 이동, 무한루프
- prev/next 버튼
- 하단: "CONTENT" 레이블 + 프로그레스 바
- JS: slider.js (클론 방식 무한루프)

### 3. Global (이미지 등장 애니메이션)
- 좌/우 50% 이미지 + 가운데 이미지
- 텍스트 이미지 위 중앙 겹침
- 순차 등장: 왼쪽(0s) → 오른쪽(0.8s) → 가운데(1.6s)
- JS: global.js (IntersectionObserver)

### 4. Brand (캡슐 마퀴)
- GLOBAL NO.1 레이블 + 타이틀 + 바디
- 세로 캡슐(200x320px) 무한 횡스크롤 + 상하 웨이브 플로팅
- 캡슐 뒤에 흘러가는 물결 SVG
- JS: brand.js (rAF 기반 정밀 루프)

### 5. Trust (스크롤 텍스트 + 뱃지)
- 왼쪽: 검정 배경, 큰 글씨 무한 수직 스크롤 (검증된상권/안전한놀이(포인트)/안정적수요/부모의신뢰)
- 실루엣 이미지 왼쪽 하단 겹침
- 오른쪽: 타이틀 + 바디 + 원형 뱃지 2개 (아이콘 + 텍스트 원 안에)
- JS: trust.js (rAF 기반, 자동 클론 충분히 채움)

### 6. Profit (우상향 그래프)
- 왼쪽 상단 텍스트 (span 포인트컬러)
- 파란색 곡선 우상향 그래프 (그라데이션 채움 + 5개 노드 + 글로우 + 수직 가이드)
- 앱 이미지 박스 (우측 30% 지점, 그래프 완성 후 페이드인)
- 실루엣 우측 하단
- clipPath 애니메이션으로 왼→오른 리빌
- JS: profit.js (clipPath rect width 애니메이션 + IntersectionObserver)

## 파일 구조
```
project/
├── index.html
├── style.css
├── slider.js
├── global.js
├── brand.js
├── trust.js
├── profit.js
├── CLAUDE.md
└── images/
    ├── pc/
    │   ├── hero_pc.jpg
    │   ├── slide01~05.jpg
    │   ├── global_left.jpg, global_right.jpg, global_center.png
    │   ├── capsule01~06.jpg
    │   ├── badge01.png, badge02.png
    │   ├── silhouette.png, silhouette2.png
    │   └── app.jpg
    └── mo/
        └── hero_mo.jpg
```

## 클라이언트 전달 사항
- 디자인: Google Drive (PSD 대신 JPG + 리소스 이미지로 작업)
- 포토이미지는 임의 배치, 추후 클라이언트가 교체
- 자동재생 영상은 mp4로 받아 video 태그 사용 (유튜브 자동재생 불가)
- 모바일 시안이 있으면 시안대로, 없으면 PC 기준 자연스럽게 대응

## 남은 작업
- 클라이언트 디자인 시안 기준 세부 수치/색상 맞춤
- 모바일 시안 반영
- 추가 섹션 (있을 경우)
- 자동재생 영상 섹션 (mp4 전달 시)
- 최종 QA 및 브라우저 테스트
