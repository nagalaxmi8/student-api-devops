const express=require('express');
const app=express();
app.use(express.json());
let students=[
    {id:1,name:'Rahul',age:20,dept:'CSE'},{id:2,name:'Raji',age:18,dept:'CSE'}
];
//read:get all students(display)
app.get('/students',(req,res)=>{res.json(students)});
//create:post or add a student
app.post('/students',(req,res)=>{const student={id:students.length+1,...req.body};
students.push(student);
res.status(201).json(student)});
//update:put or to replacwe the stu details
app.put('/students/:id',(req,res)=>{
    const id=Number(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Not found' });
    }
    students[index] = { id, ...req.body };
    res.json(students[index]);
});
//delete
app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }
  students.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
});
// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});