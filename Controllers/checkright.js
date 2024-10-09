const pgdb = require("../config/pgdb");
//const getPool = require("../config/db");
const getmy = require("../config/mydb");

exports.inscrightlog = async (req, res) => {
  const connection = await getmy.getConnection();
  const all = { ...req.body };
  try {
    const results = await connection.query(
      "insert  into cright_log(cid,hn,vn,pttype,vstdate,hospmain,rent_id,hospsub,maininscl,subinscl,primaryprovince,rightold,rightnew,status)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        all.cid,
        all.hn,
        all.vn,
        all.pttype,
        all.vstdate,
        all.hospmain,
        all.rent_id,
        all.hospsub,
        all.maininscl,
        all.subinscl,
        all.primaryprovince,
        all.rightold,
        all.rightnew,
        all.status
      ]
    );
    // ปิดการเชื่อมต่อ
    connection.release();
    if (results[0].affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(201).json({ message: "User Cerate Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.rrightlogid = async (req, res) => {
  const connection = await getmy.getConnection();
  const { vn,vstdate } = req.body;
  try {
    const results = await connection.query(
      "select *  from cright_log where vn=?",
      [vn]
    );
    connection.release();
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.send(results[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.crightslist = async (req, res, next) => {
  const { date1 } = req.body;
  const clients = await pgdb.getClient();
  try {
    const qeurytext = `select row_number() over() as number, x.* as counssst 
      from(
       select pt.cid,o.oqueue, k.department,o.hn,o.vn ,concat(pt.pname,pt.fname,' ',pt.lname) as names,o.pttype ,p.name as pttypes,o.vstdate,o.hospmain,h.name as hospname ,ou.name as staff_name,'สิทธิไม่สอดคลองกับสถานพยาบาล' as err
      ,count(pf.rent_id) as rent_id
      from ovst o 
      left join opdrent	pf on pf.hn = o.hn and pf.return_date is null
      left join patient pt on pt.hn=o.hn
      left join pttype p on p.pttype = o.pttype
      left join hospcode h on h.hospcode = o.hospmain
      left outer join opduser ou on ou.loginname = o.staff 
      left join kskdepartment k  on o.main_dep=k.depcode
      where o.vstdate between $1 and $2
          and o.staff='kiosk'
      and ((o.pttype in('69','71') and h.chwpart = '32')
          or(o.pttype in('68','70') and h.chwpart != '32')
          or( o.pttype in('48','19','23') and o.hospmain!='10668'))
          GROUP BY  pt.cid,o.oqueue,k.department,o.hn,o.vn,names,o.pttype,pttypes,o.staff,o.vstdate,o.hospmain,hospname,staff_name,err,rent_id
      union
          
      select  pt.cid,o.oqueue,k.department,o.hn,o.vn ,concat(pt.pname,pt.fname,' ',pt.lname) as names,o.pttype ,p.name as pttypes,o.vstdate,o.hospmain,h.name as hospname,ou.name as staff_name,'สถานพยาบาลหลักโรงพยาบาลสุรินทร์แต่สิทธิไม่ใช่ สิทธิบัตรทอง(รพ.สร)' as err
      ,count(pf.rent_id) as rent_id
      from ovst o 
      left join opdrent	pf on pf.hn = o.hn and pf.return_date is null
      left join patient pt on pt.hn=o.hn
      left join pttype p on p.pttype = o.pttype
      left join hospcode h on h.hospcode = o.hospmain
      left outer join opduser ou on ou.loginname = o.staff 
      left join kskdepartment k  on o.main_dep=k.depcode
      where o.vstdate between $1 and $2
          and o.staff='kiosk'
      and o.pttype in('68','69','70','71')
      and o.hospmain = '10668'
      GROUP BY  pt.cid,o.oqueue,k.department,o.hn,o.vn,names,o.pttype,pttypes,o.vstdate,o.hospmain,hospname,staff_name,err,rent_id,o.staff
  
      union
      select  pt.cid,o.oqueue,k.department,o.hn,o.vn ,concat(pt.pname,pt.fname,' ',pt.lname) as names,o.pttype ,p.name as pttypes,o.vstdate,o.hospmain,h.name as hospname ,ou.name as staff_name,'มีการให้สิทที่มีสถานะ(ยกเลิกการใช้งาน)' as err
      ,count(pf.rent_id) as rent_id
      from ovst o 
      left join opdrent	pf on pf.hn = o.hn and pf.return_date is null
      left join patient pt on pt.hn=o.hn
      left join pttype p on p.pttype = o.pttype
      left join hospcode h on h.hospcode = o.hospmain
      left join kskdepartment k  on o.main_dep=k.depcode
      left outer join opduser ou on ou.loginname = o.staff 
      where o.vstdate between $1 and $2
      and p.isuse = 'N'
      GROUP BY  pt.cid,o.oqueue,k.department,o.hn,o.vn,names,o.pttype,pttypes,o.vstdate,o.hospmain,hospname,staff_name,err,rent_id,o.staff
  
      union
      select  pt.cid,o.oqueue,k.department,o.hn,o.vn ,concat(pt.pname,pt.fname,' ',pt.lname) as names,o.pttype ,p.name as pttypes,o.vstdate,o.hospmain,h.name as hospname ,ou.name as staff_name,'คนไข้สิทธิชำระเงินเองที่ออกโดยตู้ kios' as err
      ,count(pf.rent_id) as rent_id
      from ovst o
      left join opdrent	pf on pf.hn = o.hn and pf.return_date is null
      left join patient pt on pt.hn=o.hn
      left join pttype p on p.pttype = o.pttype
      left join kskdepartment k  on o.main_dep=k.depcode
      left join hospcode h on h.hospcode = o.hospmain
      left outer join opduser ou on ou.loginname = o.staff 
      where o.vstdate between $1 and $2
     AND o.staff = 'kiosk'
   AND p.pttype in('01')
   GROUP BY  pt.cid,o.oqueue,k.department,o.hn,o.vn,names,o.pttype,pttypes,o.vstdate,o.hospmain,hospname,staff_name,err,rent_id,o.staff
   ) x order by x.oqueue asc `;

    const values = [date1, date1];
    const results = await clients.query(qeurytext, values);
    // ปิดการเชื่อมต่อ
    clients.release();
    if (results == "") {
      res.status(404).json({ message: "No User found" });
    } else {
      res.status(200).json(results.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.tokenright = async (req, res, next) => {
  const clients = await pgdb.getClient();
  try {
    const qeurytext = `select cid ,token  from nhso_token where is_invalid='N' order by  update_datetime desc limit 1`;
    const results = await clients.query(qeurytext);
    // ปิดการเชื่อมต่อ
    clients.release();
    if (results == "") {
      res.status(404).json({ message: "No User found" });
    } else {
      res.status(200).json(results.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/* test */
exports.stag_use_ins = async (req, res) => {
  const connection = await getmy.getConnection();
  const all = { ...req.body };
  try {
    const results = await connection.query(
      "insert  into cright_stag_use(cid,hn,vn,pttype,vstdate,hospmain,rent_id,hospsub,maininscl,subinscl,primaryprovince,rightold,rightnew)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        all.cid,
        all.hn,
        all.vn,
        all.pttype,
        all.vstdate,
        all.hospmain,
        all.rent_id,
        all.hospsub,
        all.maininscl,
        all.subinscl,
        all.primaryprovince,
        all.rightold,
        all.rightnew,
      ]
    );
    // ปิดการเชื่อมต่อ
    connection.release();
    if (results[0].affectedRows === 0) {
      res.status(404).json({ error: "cright_stag_use not found" });
    }
    res.status(201).json({ message: "cright_stag_use Cerate Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.stag_use_get_id = async (req, res) => {
  const connection = await getmy.getConnection();
  const { vn } = req.body;
  try {
    const results = await connection.query(
      "select count(*) as vncount  from cright_stag_use where vn=?",
      [vn]
    );
    connection.release();
    if (results.length === 0) {
      return res.status(404).json({ error: "cright_stag_use not found" });
    }
    res.send(results[0][0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.stag_use_del = async (req, res) => {
  const connection = await getmy.getConnection();
  const { vn } = req.body;
  try {
    const results = await connection.query(
      "delete from cright_stag_use where vn=?",
      [vn]
    );
    connection.release();
    if (results.length === 0) {
      return res.status(404).json({ error: "cright_stag_use not found" });
    }
    res.send(results[0][0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
