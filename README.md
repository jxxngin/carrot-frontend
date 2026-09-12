# Carrot Frontend

당근의 중고거래 화면을 참고하여 React와 Next.js를 복습하는
학습용 프론트엔드 프로젝트입니다.

Java Spring Boot로 만든 Carrot Backend와 연결합니다.

## 개발 환경

- Node.js 24
- npm
- Next.js 16.3.5 / App Router
- React / TypeScript
- CSS / CSS Modules
- ESLint

정확한 의존성 버전은 package.json과 package-lock.json을 참고합니다.

## 실행 방법

처음 코드를 내려받은 경우:

```bash
npm ci
```

개발 서버 실행:

```bash
npm run dev
```

접속 주소: http://localhost:3000

## 주요 구조

- src/app/page.tsx: 첫 화면
- src/app/layout.tsx: 공통 레이아웃
- src/app/globals.css: 전역 스타일
- public/: 정적 파일

## 현재 진행 상태

- Next.js 프로젝트 생성 및 개발 서버 실행 완료
- 상품 화면과 백엔드 API 연결은 아직 구현하지 않았습니다.

## 구현 예정

- 상품 카드와 목록 화면
- Java 백엔드 상품 목록 API 연결
- 로딩·오류·빈 목록 처리
- 이후 Vercel 배포