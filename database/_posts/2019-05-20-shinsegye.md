## 코딩인터뷰 14.데이터베이스(MySQL)

### Count

- Count(*) : 테이블 모든 행의 수 반환
- Count(COMN): COMN컬럼에 있는 행의 수 반환
- group by오 ㅏ함게 쓰면 그룹에 속해있는 행의 수 반환

### ISNULL

- 함수명(널값을 확인할 컬럼,널값일경우 대체하여 데이터를 보여줄 컬럼)
- mssql 은  ISNULL
- oracle 은 NVL
- mysql 은IFNULL

### UPDATE

[예제] 선수 테이블의 백넘버를 일괄적으로 99로 수정한다.

[예제] UPDATE PLAYER SET BACK_NO = 99; 480개의 행이 수정되었다.

### 칼럼추가

```
ALTER TABLE `테이블명` ADD `새컬럼명`;
```

### 테이블생성, 데이터 삽입

- <https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all>

```SQL
 CREATE TABLE Courses ( 
 CourseID CHAR(7) NOT NULL PRIMARY KEY, 
 CourseName VARCHAR2(20) NOT NULL, 
 TeacherID VARCHAR2(20),
 FOREIGN KEY(TeacherID) REFERENCES Teachers(TeacherID));

 CREATE TABLE Teachers ( 
 TeacherID CHAR(7) NOT NULL PRIMARY KEY, 
 TeacherName VARCHAR2(20) NOT NULL);

 CREATE TABLE Students( 
StudentID CHAR(7) NOT NULL PRIMARY KEY, 
StudentName VARCHAR2(20) NOT NULL);

 CREATE TABLE StudentsCourses( 
CourseID CHAR(7) NOT NULL, 
StudentID VARCHAR2(20) NOT NULL,
FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) 
FOREIGN KEY (StudentID) REFERENCES Students(StudentID) );

CREATE TABLE StudentsCourses( 
CourseID CHAR(7) NOT NULL, 
StudentID VARCHAR2(20) NOT NULL,
primary key(courseid,studentid));


Insert Into Students VALUES("1","정현영");
Insert Into Students VALUES("5","김영준");



Insert Into Students VALUES("1","정현영");
Insert Into Teachers VALUES("1","이희숙");
Insert Into Teachers VALUES("2","정해종");
Insert Into Teachers VALUES("3","정옥진");
Insert Into Teachers VALUES("4","박도순");

Insert Into Courses VALUES("1","자료구조",“1”);
Insert Into Courses VALUES("2","알고리즘",“1”);
Insert Into Courses VALUES("3","머신러닝",“2”);
Insert Into Courses VALUES("4","데이터분석",“3”);

Insert Into studentscourses VALUES("1","1"),("1","2"),("3","4"),("4","3"),("1","3"),("2","1");
```

### 조인

- 테이블들

  | TeacherID | TeacherName |
  | :-------- | :---------- |
  | 1         | 이희숙      |
  | 2         | 정해종      |
  | 3         | 정옥진      |

  | StudentID | StudentName |
  | :-------- | :---------- |
  | 1         | 정현영      |
  | 2         | 정현영      |
  | 3         | 정주영      |
  | 4         | 정상영      |
  | 5         | 김영준      |

  | CourseID | StudentID |
  | :------- | :-------- |
  | 1        | 1         |
  | 1        | 2         |
  | 3        | 4         |
  | 4        | 3         |
  | 1        | 3         |
  | 2        | 1         |

  | CourseID | CourseName | TeacherID |
  | :------- | :--------- | :-------- |
  | 1        | 자료구조   | 1         |
  | 2        | 알고리즘   | 1         |
  | 3        | 머신러닝   | 2         |
  | 4        | 데이터분석 | 3         |


#### 모든 학생의 목록을 뽑고 각 학생이 얼마나 많은 강의를 수강하고 있는가?

```sql
select students.studentname, count(*)
from students inner join StudentsCourses
on students.studentid = studentscourses.studentid
group by students.studentid;

select *, count(*)
from students left join StudentsCourses
on students.studentid = studentscourses.studentid
group by students.studentid;
```

| StudentID | StudentName | CourseID | count(*) |
| :-------- | :---------- | :------- | :------- |
| 1         | 정현영      | 1        | 1        |
| 2         | 정현영      | 1        | 1        |
| 3         | 정주영      | 1        | 2        |
| 4         | 정상영      | 3        | 1        |
| *null*    | 김영준      | *null*   | 1        |

- 위 결괏값에서  StudentID가 왜  null이지? 걍 그대로 김영준의 studentid가 나와야 하는거 아닌가?
-  count(studentscourses.courseid) 이거를 붙이면 null을 0으로 센다.,..
- 최종 값

```sql
select studentname, students.studentid, count(studentscourses.courseid) 
from students left join studentscourses
on students.studentid = studentscourses.studentid
group by students.studentid, students.studentname;
```

#### 각 교사가 가르치는 학생의 수? 한 교사가 동일 학생을 여러 강의에서 가르칠경우, 그 각각을 다른 학생으로 간주, 교사 리스트는 각 교사가 가르치는 학생 수를 기준으로 내림차순 정렬

- 내생각(이렇게 해도 똑같은거 같은데..)
- 레프트,라이트조인 할때는 그룹명을 축약못시키나 봅니다?
  - as 로하셈
- 내생각으로 하면 null을 0으로.. 어떻게 뺴는지 모르겠다

```sql
select t.teachername, count(t.teachername) as cnt
from teachers as t
LEFT OUTER JOIN courses as c
ON t.teacherid = c.teacherid
LEFT OUTER JOIN studentscourses as sc
ON c.courseid = sc.courseid
group by t.teachername
order by cnt desc
```

- 결과

```sql
select teacherid,count(studentscourses.courseid) as[number]
from courses inner join studentscourses
on courses.courseid = studentscourses.courseid
group by courses.teacherid
```

```sql
select teachername, ifnull(studentsize.number,0) as cnt
from teachers left join
(select teacherid,count(studentscourses.courseid) as[number]
from courses inner join studentscourses
on courses.courseid = studentscourses.courseid
group by courses.teacherid) studentsize
on teachers.teacherid = studentsize.teacherid
order by studentsize.number desc
```

### 면접문제

#### 14.1 하나 이상의 집을 대여한 모든 거주자의 목록을 구하는 SQL 질의문

- 내풀이

```SQL
select tenantID, tenantname
from tenants t, apttenants at
where at.tenantid = t.tenantid;
-
```

- 하나이상의 강의가 되고 있는 모든 강의목록을 구하는 SQL을 작성하라

```SQL
select courses.coursename
from courses inner join 
(select courseid
from studentscourses
group by courseid
having count(*) >= 1) c
on courses.courseid = c.courseid;
```

- 위와 아래는 같은 결과 (내림차순 추가)

```SQL
select c.coursename, count(*) as cnt
from courses c, studentscourses sc
where c.courseid = sc.courseid
group by c.coursename
order by cnt desc;
```



#### 14.2 모든 건물 목록과 Status가 Open인 모든 Request의 개수를 구하라

- 내풀이

```SQL
select ap.buildingid,count(*)as cnt
from apartments ap, requests r,buildings b
where ap.aptid = r.aptid AND r.satus='Open'
group by ap.aptid;
```



#### 14.3 11번 빌딩에서 대규모 리모델링 공사를 진행중이다. 이 건물에 있는 모든 집에 대한 모든 Request의 Status를 Close로 변경해주는 질의문 작성

- 내풀이

```sql
UPDATE rq SET rq.Status = 'close'
FROM apartments ap,REquests rq
WHERE ap.aptID = rq.aptID AND ap.AptID = 11;
```

- 정답풀이

```
UPDATE Requests
SET Status = 'Closed'
WHERE AptID IN (SELECT AptID FROM Apartments WHERE BUildingID = 11);
```

- 위 테이블 -> 컴퓨터공학인 학생중 수업듣는 학생들 중 강의실을 301호 수업으로 변경

```sql
UPDATE studentscourses
SET 강의실 = '301호'
WHERE studentid IN
(select studentid
from students
where 전공 = '컴퓨터공학');
```

- studentid = 으로하면 2개바뀌고 studentID IN 으로하면 3개가바뀐다..? 
  - =으로하면 첫행이 1,2,6이니 studentid가1인학생만 바뀌는것같음
  - 맞음 -> 행을 내림차순으로 만들면 6,2,1이되고 =로했을 때 studentid가 6인학생의 호수만 바뀌었음
- 