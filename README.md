# Student Management System (React + Redux + json-server)

## Run it
```bash
npm install
npm run dev        # starts json-server (port 5000) + React (port 3000)
```
Or in two terminals: `npm run server` and `npm start`.

Login: **teacher@school.com / 123456**

## Structure
```
student-management/
├── db.json                  # json-server database (users + students)
├── package.json
├── public/index.html
└── src/
    ├── index.js             # Provider + Router + Bootstrap import
    ├── App.js               # routes
    ├── App.css              # theme styling
    ├── redux/
    │   ├── actionTypes.js
    │   ├── studentActions.js   # actions + thunks (fetch/add/update/delete)
    │   ├── authActions.js      # login/logout thunk
    │   ├── studentReducer.js
    │   ├── authReducer.js
    │   └── store.js
    └── components/
        ├── Navbar.js
        ├── Login.js
        ├── PrivateRoute.js
        ├── StudentList.js     # fetch, sort, filter, search
        ├── StudentForm.js     # addStudent
        ├── StudentDetails.js  # updateStudent + deleteStudent
        └── Profile.js
```
