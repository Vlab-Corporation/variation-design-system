# Variation Design System - 추가 권장 목록

현재 보유 컴포넌트 41개, 토큰 7종(colors, typography, spacing, animations, shadows, zIndex, textStyles) 기준으로
일반적인 통합 디자인 시스템 대비 누락되거나 추가하면 좋을 항목을 정리합니다.

---

## 1. 누락된 기초(Primitive) 컴포넌트

일반적인 디자인 시스템(Chakra, Radix, shadcn/ui, MUI 등)이 거의 필수로 제공하는 컴포넌트 중 현재 없는 것들입니다.

| 컴포넌트 | 설명 | 우선순위 | 상태 |
|---------|------|---------|------|
| ~~**Typography**~~ | Heading, Text, Label 등 텍스트 렌더링 전용 컴포넌트 | 높음 | ✅ Phase 1 |
| ~~**Checkbox**~~ | 폼의 핵심 요소 | 높음 | ✅ Phase 1 |
| ~~**Radio / RadioGroup**~~ | 단일 선택 폼 요소 | 높음 | ✅ Phase 1 |
| ~~**Select**~~ | 드롭다운 선택. native select + custom select 모두 | 높음 | ✅ Phase 1 |
| ~~**Textarea**~~ | 여러 줄 텍스트 입력 (Input만 존재) | 높음 | ✅ Phase 1 |
| ~~**Toggle / Switch**~~ | on/off 상태 전환 | 높음 | ✅ Phase 1 |
| ~~**Avatar**~~ | 사용자 프로필 이미지/이니셜 표시 | 높음 | ✅ Phase 2 |
| ~~**Modal / Dialog**~~ | 오버레이 대화상자 | 높음 | ✅ Phase 1 |
| ~~**Tooltip**~~ | 호버 시 부가 정보 표시 | 높음 | ✅ Phase 1 |
| ~~**Popover**~~ | 클릭 시 떠오르는 정보 패널 | 중간 | ✅ Phase 2 |
| ~~**Dropdown Menu**~~ | 컨텍스트 메뉴, 액션 메뉴 | 높음 | ✅ Phase 1 |
| ~~**Tabs**~~ | 탭 기반 콘텐츠 전환 | 높음 | ✅ Phase 2 |
| ~~**Accordion**~~ | 접기/펼치기 콘텐츠 | 중간 | ✅ Phase 4 |
| ~~**Toast / Notification**~~ | 일시적 피드백 메시지 (Alert와 별개) | 높음 | ✅ Phase 1 |
| ~~**Separator / Divider**~~ | 시각적 구분선 | 낮음 | ✅ Phase 2 |
| ~~**Skeleton**~~ | 로딩 플레이스홀더 | 중간 | ✅ Phase 2 |
| ~~**Progress**~~ | 진행률 표시 바 | 중간 | ✅ Phase 4 |
| **Slider** | 범위 값 선택 | 중간 | |

---

## 2. 누락된 레이아웃 / 구조 컴포넌트

| 컴포넌트 | 설명 | 우선순위 | 상태 |
|---------|------|---------|------|
| ~~**Stack (VStack / HStack)**~~ | 방향별 자동 간격 레이아웃 | 높음 | ✅ Phase 2 |
| **Grid** | 그리드 레이아웃 래퍼 | 중간 | |
| **Container** | 최대 너비 + 중앙 정렬 래퍼 | 중간 | |
| **AspectRatio** | 비율 고정 래퍼 | 낮음 | |
| **Sidebar / Navigation** | 사이드바 네비게이션 레이아웃 | 중간 | |
| **Header / Footer** | 페이지 헤더/푸터 레이아웃 | 낮음 | |

---

## 3. 누락된 피드백 / 상태 컴포넌트

| 컴포넌트 | 설명 | 우선순위 | 상태 |
|---------|------|---------|------|
| ~~**EmptyState**~~ | 데이터 없음 상태 표시 | 중간 | ✅ Phase 4 |
| **ErrorBoundary** | React 에러 경계 래퍼 | 중간 | |
| **ConfirmDialog** | 확인/취소 대화상자 (Modal 기반) | 중간 | |
| **LoadingOverlay** | 전체 영역 로딩 오버레이 | 낮음 | |

---

## 4. 누락된 내비게이션 컴포넌트

| 컴포넌트 | 설명 | 우선순위 | 상태 |
|---------|------|---------|------|
| ~~**Pagination**~~ | 페이지 네비게이션 | 높음 | ✅ Phase 2 |
| ~~**Stepper**~~ | 단계별 진행 표시기 | 중간 | ✅ Phase 4 |
| ~~**CommandPalette**~~ | Ctrl+K 스타일 커맨드 검색 | 낮음 | ✅ Phase 4 |
| **NavigationMenu** | 상단 내비게이션 메뉴 (Breadcrumb만 존재) | 중간 | |
| **Link** | 스타일된 앵커 컴포넌트 | 중간 | |

---

## 5. 누락된 데이터 표시 컴포넌트

| 컴포넌트 | 설명 | 우선순위 | 상태 |
|---------|------|---------|------|
| ~~**Tag / Chip**~~ | 삭제 가능한 태그 (Badge와 다름 - 인터랙티브) | 중간 | ✅ Phase 4 |
| **List** | 구조화된 목록 (ul/ol 래퍼) | 낮음 | |
| **Timeline** | 시간순 이벤트 표시 | 낮음 | |
| **Stat** | 수치 통계 표시 카드 | 낮음 | |
| ~~**Calendar**~~ | 날짜 표시/선택 | 중간 | ✅ Phase 4 |
| **DatePicker** | 날짜 입력 (Calendar 기반) | 중간 | |

---

## 6. 디자인 토큰 추가 권장 사항

### 6-1. 컬러

| 항목 | 현재 상태 | 권장 추가 | 상태 |
|------|----------|----------|------|
| **Accent 컬러** | 없음 | primary와 다른 강조색 1~2종 (CTA, 하이라이트 등) | |
| ~~**Surface 컬러**~~ | background에 일부만 | `surface.raised`, `surface.sunken`, `surface.overlay` 등 계층별 배경색 | ✅ Phase 3 |
| ~~**Interactive 컬러**~~ | 없음 | `interactive.default`, `interactive.hover`, `interactive.pressed`, `interactive.disabled` | ✅ Phase 3 |
| ~~**Link 컬러**~~ | 없음 | `link.default`, `link.hover`, `link.visited` | ✅ Phase 3 |
| ~~**Focus ring 컬러**~~ | border.focus만 | `focus.ring`, `focus.outline` (색상 + 너비 + 오프셋) | ✅ Phase 3 |
| ~~**Destructive 컬러**~~ | error와 혼용 가능 | 명시적 `destructive` 시맨틱 컬러 (삭제/위험 액션용) | ✅ Phase 3 |

### 6-2. 그림자(Shadow)

| 항목 | 현재 상태 | 권장 추가 | 상태 |
|------|----------|----------|------|
| ~~**Box Shadow 토큰**~~ | 없음 | `shadow.sm`, `shadow.md`, `shadow.lg`, `shadow.xl` (elevation 체계) | ✅ Phase 3 |
| ~~**Focus Shadow**~~ | 없음 | 포커스 링 전용 shadow | ✅ Phase 3 |
| ~~**Inner Shadow**~~ | 없음 | inset shadow (input 등에 사용) | ✅ Phase 3 |

### 6-3. Z-Index

| 항목 | 현재 상태 | 권장 추가 | 상태 |
|------|----------|----------|------|
| ~~**Z-Index 스케일**~~ | 없음 | `zIndex.dropdown(1000)`, `zIndex.sticky(1020)`, `zIndex.modal(1050)`, `zIndex.popover(1060)`, `zIndex.tooltip(1070)`, `zIndex.toast(1080)` | ✅ Phase 3 |

### 6-4. 타이포그래피

| 항목 | 현재 상태 | 권장 추가 | 상태 |
|------|----------|----------|------|
| ~~**시맨틱 텍스트 스타일**~~ | 원시 값만 존재 | `heading.h1`~`h6`, `body.lg`, `body.md`, `body.sm`, `caption`, `overline` 같은 조합 프리셋 | ✅ Phase 3 |
| ~~**Display 폰트**~~ | 없음 | 히어로 섹션용 큰 사이즈 (`display.lg`, `display.md`) | ✅ Phase 3 |

### 6-5. 기타 토큰

| 항목 | 현재 상태 | 권장 추가 | 상태 |
|------|----------|----------|------|
| **Opacity** | 없음 | `opacity.disabled(0.5)`, `opacity.overlay(0.8)`, `opacity.hover(0.04)` | |
| **Breakpoints** | Tailwind 기본값 사용 | 프로젝트 전용 breakpoint 명시적 정의 | |
| **컴포넌트 사이즈 토큰** | 각 컴포넌트 내부에만 | 공통 사이즈 체계 `size.xs`~`xl` (height, padding 조합) | |
| **아이콘 사이즈** | 없음 | `icon.sm(16)`, `icon.md(20)`, `icon.lg(24)`, `icon.xl(32)` | |
| **Ring Width** | 없음 | 포커스 링 두께 토큰 | |

---

## 7. 유틸리티 / 훅 권장 추가

| 항목 | 설명 | 우선순위 | 상태 |
|------|------|---------|------|
| **useMediaQuery** | 반응형 분기 훅 | 중간 | |
| **useClickOutside** | 외부 클릭 감지 (Popover, Dropdown에 필요) | 높음 | |
| **useKeyboard** | 키보드 단축키 핸들링 | 중간 | |
| **useFocusTrap** | 모달 내 포커스 가두기 | 높음 | |
| **useDisclosure** | open/close 상태 관리 (Modal, Accordion 등) | 중간 | |
| **VisuallyHidden** | 스크린리더 전용 텍스트 컴포넌트 | 중간 | |
| ~~**Portal**~~ | DOM 트리 외부 렌더링 (Modal, Tooltip에 필요) | 높음 | ✅ Phase 1 |

---

## 8. 현재 보유하지만 일반적 DS에 없는 특화 컴포넌트 (강점)

이 프로젝트에만 있는 고유 컴포넌트로, 프로젝트 목적에 맞는 차별화 요소입니다.

| 컴포넌트 | 일반 DS 포함 여부 |
|---------|-----------------|
| **AudioRecorder** | 매우 드묾 |
| **MarkdownEditor** | 드묾 (별도 라이브러리로 제공되는 경우가 많음) |
| **KanbanBoard** | 드묾 (프로젝트 관리 도구 특화) |
| **PageTree** | 드묾 (CMS/위키 특화) |
| **SyncStatus** | 매우 드묾 (실시간 협업 도구 특화) |
| **IconPicker** | 드묾 (에디터 도구 특화) |
| **CoverImage** | 드묾 (CMS 특화) |

---

## 9. 권장 구현 순서 (로드맵)

### Phase 1 - 기초 필수 (폼 + 오버레이) ✅ 완료
1. ~~Typography (Heading, Text)~~
2. ~~Checkbox / Radio / RadioGroup~~
3. ~~Select~~
4. ~~Textarea~~
5. ~~Toggle / Switch~~
6. ~~Modal / Dialog + Portal~~
7. ~~Toast / Notification~~
8. ~~Dropdown Menu~~
9. ~~Tooltip~~

### Phase 2 - 레이아웃 + 내비게이션 ✅ 완료
10. ~~Stack (VStack / HStack)~~
11. ~~Tabs~~
12. ~~Pagination~~
13. ~~Avatar~~
14. ~~Skeleton~~
15. ~~Popover~~
16. ~~Separator~~

### Phase 3 - 토큰 확장 ✅ 완료
17. ~~Shadow 토큰~~
18. ~~Z-Index 토큰~~
19. ~~시맨틱 텍스트 스타일 프리셋~~
20. ~~Interactive / Surface 컬러~~

### Phase 4 - 고급 컴포넌트 ✅ 완료
22. ~~Accordion~~
23. ~~Progress~~
24. ~~Tag / Chip~~
25. ~~Stepper~~
26. ~~DatePicker / Calendar~~
27. ~~EmptyState~~
28. ~~CommandPalette~~

---

*이 문서는 2026-02-11 기준으로 작성되었습니다. Phase 1~4 로드맵 전체 완료.*
