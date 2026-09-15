# Carrot Frontend

당근의 중고거래 화면을 참고하여 React와 Next.js를 학습하는
프론트엔드 프로젝트입니다.

Java Spring Boot로 만든 Carrot Backend와 연결하여
상품 등록·조회·수정·삭제 기능을 제공합니다.

## 개발 환경

- Node.js 24 / npm
- Next.js 16.3.5 / App Router
- React / TypeScript
- CSS / CSS Modules
- ESLint / Prettier
- Visual Studio Code

정확한 의존성 버전은 package.json과 package-lock.json을 참고합니다.

## 구현 기능

- 상품 목록과 상품 카드
- 상품 상세 조회
- 가격 표시 및 0원 상품의 나눔 표시
- 로딩·오류·빈 목록 안내
- 조회 실패 시 재시도
- 잘못된 상품 ID 및 존재하지 않는 상품 안내
- 반응형 상품 목록
- 상품 등록 및 성공 시 상세 화면 이동
- 등록 중 버튼 비활성화
- 백엔드 검증 오류를 입력란별로 표시
- 등록 실패 시 입력값 유지
- 기존 상품 정보를 불러오는 수정 폼
- 상품 수정 및 상세·목록 갱신
- 수정 실패 시 입력값 유지와 오류 안내
- 삭제 전 확인 및 처리 중 버튼 비활성화
- 삭제 성공 또는 이미 삭제된 상품 처리 후 목록 이동

## 실행 방법

### 1. 의존성 설치

```bash
npm ci
```

### 2. 환경 변수 설정

처음 실행하는 경우 예제 파일을 복사합니다.

```bash
cp .env.example .env.local
```

.env.local의 백엔드 주소를 확인합니다.

```dotenv
API_BASE_URL=http://localhost:8080
```

### 3. 백엔드 실행

Carrot Backend를 먼저 실행합니다.
기본 주소는 http://localhost:8080 입니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

접속 주소: http://localhost:3000

## 코드 검사

```bash
npm run lint
npx tsc --noEmit
```

## 배포용 빌드 및 실행

```bash
npm run build
npm run start
```

기본 포트가 같으므로 실행 중인 개발 서버를 종료한 뒤 실행합니다.
상품을 조회하려면 백엔드가 실행 중이어야 합니다.

## 주요 구조

- app/page.tsx: 상품 목록
- app/products/[id]/page.tsx: 상품 상세
- app/products/[id]/not-found.tsx: 상품 없음 안내
- app/loading.tsx: 공통 로딩 화면
- app/error.tsx: 공통 오류 및 재시도 화면
- app/layout.tsx: 공통 레이아웃
- app/globals.css: 전역 스타일
- components/ProductCard.tsx: 상품 카드
- types/product.ts: 상품 응답 타입
- public/: 정적 파일
- app/products/new/page.tsx: 상품 등록 폼
- app/products/new/actions.ts: 상품 등록 서버 함수
- app/products/[id]/edit/page.tsx: 수정할 상품 조회
- app/products/[id]/edit/EditProductForm.tsx: 상품 수정 폼
- app/products/[id]/edit/actions.ts: 상품 수정 서버 함수
- app/products/[id]/DeleteProductButton.tsx: 삭제 확인 버튼
- app/products/[id]/delete-actions.ts: 상품 삭제 서버 함수
- components/ProductFormField.tsx: 등록·수정 공통 입력란
- components/ProductFormField.module.css: 입력란·도움말·오류 스타일
- types/product-form.ts: 공통 폼 입력값·오류·상태 타입
- styles/ProductForm.module.css: 등록·수정 공통 폼 스타일

## 상품 폼 구성

등록·수정 화면에서 ProductFormField를 공유합니다.

- 부모 폼은 useActionState로 처리 결과와 pending 상태를 관리합니다.
- 공통 입력란은 props로 입력값, 처리 중 상태, 오류를 전달받습니다.
- 입력 중인 값은 브라우저의 입력란이 보관하고, 제출 시 FormData로 전달합니다.
- 입력란의 name은 keyof ProductFormValues로 제한하여 오타를 방지합니다.
- 처리 중 입력란은 readOnly, 제출 버튼은 disabled를 적용합니다.
- 도움말과 입력 오류는 aria-describedby로 입력란에 연결합니다.

## API 연결 방식

조회는 서버 컴포넌트에서, 등록·수정·삭제는 Server Actions에서
Spring Boot API를 호출합니다.

브라우저 → Next.js 서버 → Spring Boot → DB

- GET /api/products: 상품 목록 조회
- GET /api/products/{id}: 상품 상세 조회
- POST /api/products: 상품 등록
- PUT /api/products/{id}: 상품 수정
- DELETE /api/products/{id}: 상품 삭제

API_BASE_URL은 Next.js 서버에서 사용하는 환경 변수입니다.
상품 조회 요청에는 cache: "no-store"를 사용합니다.
등록·수정·삭제 후에는 관련 경로를 revalidatePath로 갱신합니다.

## 코드 스타일

- .editorconfig: 기본 편집 규칙
- .prettierrc.json: Prettier 포맷 규칙
- .vscode/settings.json: 프로젝트 편집기 설정
- .vscode/extensions.json: 권장 확장 목록
- 저장 시 코드 포맷 및 import 정리
- ESLint와 TypeScript를 통한 코드 검사

## 확인한 동작

- 실제 DB 상품의 목록 및 상세 표시
- 로딩 안내
- 백엔드 종료 시 오류 안내 및 재시도 후 복구
- 잘못된 ID와 존재하지 않는 상품 안내
- 배포용 빌드 및 실행
- 등록·수정 후 상세와 목록에 반영
- 입력 검증 실패 및 서버 연결 실패 시 안내
- 등록·수정 실패 시 입력값 유지
- 삭제 취소 시 상품 유지
- 삭제 성공(204) 및 이미 삭제된 상품(404)의 목록 이동
- 일반 Chrome에서 배포용 실행으로 CRUD 흐름 확인

## 향후 계획

- Vercel 배포

배포 환경의 API_BASE_URL에는 배포된 백엔드 주소를 설정합니다.
