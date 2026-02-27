---
name: gh-release
description: GitHub Release를 생성하여 자동 배포 파이프라인을 트리거하는 워크플로우 (버전 패치, 커밋, 푸시, 릴리즈 생성)
---

이 프로젝트는 GitHub Release 기반 자동 배포 구조입니다.
Release가 publish되면 CI가 태그에서 버전을 추출하여 테스트 → 빌드 → npm publish → Storybook 배포를 자동 수행합니다.

1. **초기 상태 확인**
   - `git status`로 커밋되지 않은 변경사항이 있는지 확인합니다.
   - 커밋되지 않은 변경이 있다면 사용자에게 먼저 커밋할지 물어봅니다.
   - 현재 브랜치가 `main`인지 확인합니다. `main`이 아니면 사용자에게 알립니다.
   - `git pull origin main`으로 리모트의 최신 상태를 반영합니다. (CI가 version bump 커밋을 push하므로 로컬과 불일치할 수 있음)

2. **버전 결정**
   - `package.json`에서 현재 버전을 읽습니다. (pull 이후 최신 값 기준)
   - 인자가 있으면(`$ARGUMENTS`) 해당 값을 버전 bump 유형으로 사용합니다 (예: `patch`, `minor`, `major`, 또는 직접 버전 `0.2.0`).
   - 인자가 없으면 `patch`를 기본값으로 사용합니다.
   - semver 규칙에 따라 다음 버전을 계산하여 사용자에게 보여줍니다.
     - 예: 현재 `0.1.5` + `patch` → `0.1.6`

3. **사용자 확인**
   - "v{버전}으로 릴리즈를 생성합니다. 진행할까요?" 라고 확인합니다.
   - 사용자가 거부하면 종료합니다.

4. **푸시**
   - 로컬 커밋이 리모트에 푸시되지 않았다면 `git push origin main`을 실행합니다.

5. **GitHub Release 생성**
   - 아래 명령으로 릴리즈를 생성합니다:
     ```
     gh release create v{버전} --title "v{버전}" --generate-notes --target main
     ```
   - `--generate-notes` 플래그로 이전 릴리즈 이후의 변경사항을 자동 요약합니다.

6. **결과 확인**
   - 릴리즈 URL을 사용자에게 보여줍니다.
   - CI가 자동으로 npm publish 및 Storybook 배포를 수행한다고 안내합니다.

$ARGUMENTS
