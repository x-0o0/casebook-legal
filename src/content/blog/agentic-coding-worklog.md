---
title: "코딩 에이전트와 함께 멀티플랫폼 앱 출시 준비하기"
date: 2026-10-04
category: 작업 기록
summary: visionOS 프로토타입을 iPhone, iPad, Mac, Apple Vision Pro 앱으로 키우면서 코딩 에이전트에게 맡긴 일과 직접 판단한 일을 정리합니다.
cover: archive-building.jpg
---

## 개요

2026년 9월 29일부터 10월 4일까지 엿새 동안 visionOS 추리 게임 프로토타입을 네 플랫폼 앱으로 키워 App Store 제출 직전까지 준비했습니다. 구현은 대부분 코딩 에이전트(Claude Code)와 함께 했습니다.

이 글에서는 그 과정에서 만난 문제 다섯 가지와 해결 방법, 그리고 출시 체크리스트를 나눈 방법을 정리합니다. 문제마다 에이전트가 잘한 부분과 사람이 판단해야 했던 부분이 달랐습니다.

## 몰입 공간에서 나가는 방법 보장하기

몰입 공간을 연 상태에서 앱 창을 닫으면 사용자가 공간 안에 그대로 남는 문제가 있었습니다. visionOS에서 사용자는 언제든 몰입 경험에서 나갈 수 있어야 합니다.

창이 사라질 때 몰입 공간도 함께 닫고, 공간 안에도 나가기 버튼을 두었습니다.

```swift
@Environment(\.dismissImmersiveSpace) private var dismissImmersiveSpace

Button("나가기") {
    Task { await dismissImmersiveSpace() }
}
```

## 직접 만든 사이드바를 시스템 사이드바로 바꾸기

Mac 화면을 Apple Music처럼 바꿔 달라고 요청하자, 에이전트는 그럴듯한 사이드바를 직접 만들었습니다. 그런데 선택한 항목 뒤에 시스템과 다른 파란 배경이 생겼고, 이를 보고 직접 만든 흉내라는 걸 알아챘습니다.

`TabView`에 `.sidebarAdaptable` 스타일을 쓰면 Mac에서는 사이드바, iPhone에서는 탭 막대, iPad에서는 사이드바로 바꿀 수 있는 탭 막대가 나옵니다. 모두 시스템이 그립니다.

```swift
TabView {
    Tab("사건", systemImage: "folder") { CaseListView() }
    Tab("보관소", systemImage: "building.columns") { ArchiveView() }
}
.tabViewStyle(.sidebarAdaptable)
```

> **참고:** 이런 작은 단서로 플랫폼 표준과 다른 점을 알아보는 일은 사람이 맡았습니다.

## 바뀌지 않는 iCloud Drive 폴더 이름 피해 가기

iCloud Drive에 보이는 앱 폴더가 예전 이름 그대로 남아 있었습니다. 설정을 바꾸고 빌드 번호를 올리며 여러 번 시도했지만 바뀌지 않았습니다.

폴더 이름 정보는 Apple 쪽에 이미 남아 있어서 앱에서는 고칠 수 없는 문제였습니다. 실험을 멈추고 새 iCloud 컨테이너를 쓰기로 했습니다.

## Mac에서만 실패하는 Sign in with Apple 진단하기

iPhone에서는 Sign in with Apple이 잘 됐지만 Mac에서만 실패했습니다. 에이전트는 개발자 포털 설정을 의심했지만, 포털의 실제 상태를 아는 사람이 그 가능성을 먼저 배제했습니다.

원인은 휴지통에 남아 있던 예전 앱이 시스템(LaunchServices)에 그대로 등록돼 있던 것이었고, Mac을 재시동하자 해결됐습니다.

## 설정 화면이 통째로 닫히는 시트 고치기

iPhone 설정 화면에서 이용약관을 누르면, 약관 시트가 뜨자마자 설정 화면까지 닫혔습니다. 증상을 그대로 전하자 에이전트가 원인을 바로 찾았습니다. `Section`에 붙인 `.sheet`는 그 안의 행마다 붙습니다. 그래서 같은 시트가 여러 번 뜨려다 부딪혔고, iPhone에서는 그 충돌로 바깥의 설정 시트까지 닫혔습니다.

`.sheet`, `.alert`, `.task`를 `Section`에서 떼어 그 `Section`을 감싼 `Form`에 붙여 고쳤습니다. 같은 패턴을 쓰던 다른 화면 두 곳도 함께 고쳤습니다.

```swift
// 수정 전: Section 안의 행마다 시트가 붙습니다.
Form {
    Section("정보") {
        Button("이용약관") { showsTerms = true }
        Button("개인정보 처리방침") { showsPrivacy = true }
    }
    .sheet(isPresented: $showsTerms) { TermsView() }
}

// 수정 후: 행들을 감싸는 Form에 붙입니다.
Form {
    Section("정보") {
        Button("이용약관") { showsTerms = true }
        Button("개인정보 처리방침") { showsPrivacy = true }
    }
}
.sheet(isPresented: $showsTerms) { TermsView() }
```

> **중요:** 시트 · 알림 같은 표시 수식어는 `Section`이 아니라 `Form`처럼 행들을 감싸는 뷰에 붙이세요. `Section`에 붙이면 그 안의 행마다 붙어 서로 부딪힙니다.

## 출시 체크리스트 나누기

출시 체크리스트는 에이전트가 먼저 제안했습니다. 계정 삭제, 신고와 차단, 개인정보 매니페스트 같은 App Store 심사 항목이었습니다. 그 목록에서 이번 출시에 넣을 범위와 순서는 사람이 정했습니다.

## 역할 정리

| 에이전트에게 맡긴 일 | 사람이 판단한 일 |
|---|---|
| 체크리스트 작성 | 출시 범위와 순서 |
| 증상에서 원인 찾기 | 플랫폼 표준과 다른 점 알아보기 |
| 빠른 구현 | 실제 기기와 포털 상태 확인 |

문제가 풀린 뒤에도 "그 원인이 정말 맞았는지"를 다시 확인하는 습관이 가장 도움이 됐습니다.
