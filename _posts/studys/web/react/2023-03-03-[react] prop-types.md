---
layout: blog
study: true
background: red
category: study
categories: web/react
title: "[react] prop-types"
date: 2023-03-03 14:20:00
tags:
  - web
  - css
---

# proptypes란?

자바스크립트는 유연한 특성 때문에 코딩이 쉽지만, 타입 정의가 안되기 때문에 타입스크립트를 많이 사용한다.   
하지만 자바스크립트를 이용해 앱을 개발해야 하는 상황에서는 이러한 문제점을 피하기 위해 PropTypes를 활용한다.

## 사용법

```js
export default class AlertComponent extends PureComponent {
  static propTypes = {
    divider: PropTypes.bool,
    color: PropTypes.string,
    title: PropTypes.string,
    subhead: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
    before: PropTypes.element,
    panelClass: PropTypes.string,
  };

  render() {
    const {
      md, lg, xl, sm, xs, color, divider, icon, title, label, subhead, before,
      panelClass, children,
    } = this.props;
    return (
      <div/>
    )
  }
}
```

# proptype 종류

## shape

```js
optionalObjectWithShape: PropTypes.shape({
  color: PropTypes.string,
  fontSize: PropTypes.number
})
```

- shape는 특정 형태를 갖는 객체이다.

## arrayOf

```js
UserProfie.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preference: PropTypes.shape({
      theme: PropTypes.oneOf(["black", "white"]).isRequired,
      image: PropTypes.instanceOf(Image),
    }),
  }).isRequired,
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
};
```

UserProfie 컴포넌트의 경우,

### 필수 prop

- user

#### user prop

- 숫자 타입인 id 속성과 문자열 타입인 name 속성을 반드시 갖는 객체
- theme 속성은 black과 white 중 하나의 값이 될 수 있는 Enum 타입이며, 선택인 image 속성은 Image 클래스의 인스턴스
- 선택인 image 속성은 Image 클래스의 인스턴스

### 선택 prop

- friends

참고  
[1] https://velog.io/@eunjin/React-PropTypes-%EC%93%B0%EB%8A%94-%EC%9D%B4%EC%9C%A0-%EB%B0%A9%EB%B2%95  
[2] https://reactjs-kr.firebaseapp.com/docs/typechecking-with-proptypes.html  
[3] https://ko.reactjs.org/docs/typechecking-with-proptypes.html
