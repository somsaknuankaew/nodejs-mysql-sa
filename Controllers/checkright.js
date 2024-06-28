const pgdb = require("../config/pgdb");
//const getPool = require("../config/db");
const getmy = require("../config/mydb");

exports.inscrightlog = async (req, res) => {
  const connection = await getmy.getConnection();
  const {
    cid,
    hn,
    vn,
    pttype,
    vstdate,
    hospmain,
    rent_id,
    hospsub,
    maininscl,
    subinscl,
    primaryprovince,
    rightold,
    rightnew,
  } = req.body;

  try {
    const results = await connection.query(
      "insert  into cright_log(cid,hn,vn,pttype,vstdate,hospmain,rent_id,hospsub,maininscl,subinscl,primaryprovince,rightold,rightnew)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        cid,
        hn,
        vn,
        pttype,
        vstdate,
        hospmain,
        rent_id,
        hospsub,
        maininscl,
        subinscl,
        primaryprovince,
        rightold,
        rightnew,
      ]
    );
    if (results[0].affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(201).json({ message: "User Cerate Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  } finally {
    await connection.release();
  }
};

exports.rrightlogid = async (req, res) => {
  const connection = await getmy.getConnection();
  const { vn } = req.body;
  try {
    const results = await connection.query(
      "select count(*) as vncount  from cright_log where vn=?",
      [vn]
    );
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.send(results[0][0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  } finally {
    await connection.release();
  }
};
//pgconnect

exports.crightslist = async (req, res, next) => {
  const { date1 } = req.body;
  try {
    const client = await pgdb.connect();
    const qeurytext = `select row_number() over() as number,x.* as counssst 
      from(
          
       select pt.cid,k.department,o.hn,o.vn ,concat(pt.pname,pt.fname,' ',pt.lname) as names,o.pttype ,p.name as pttypes,o.vstdate,o.hospmain,h.name as hospname ,ou.name as staff_name,'สิทธิไม่สอดคลองกับสถานพยาบาล' as err
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
          GROUP BY  pt.cid,k.department,o.hn,o.vn,names,o.pttype,pttypes,o.staff,o.vstdate,o.hospmain,hospname,staff_name,err,rent_id
      union
          
      select  pt.cid,k.department,o.hn,o.vn ,concat(pt.pname,pt.fname,' ',pt.lname) as names,o.pttype ,p.name as pttypes,o.vstdate,o.hospmain,h.name as hospname,ou.name as staff_name,'สถานพยาบาลหลักโรงพยาบาลสุรินทร์แต่สิทธิไม่ใช่ สิทธิบัตรทอง(รพ.สร)' as err
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
      GROUP BY  pt.cid,k.department,o.hn,o.vn,names,o.pttype,pttypes,o.vstdate,o.hospmain,hospname,staff_name,err,rent_id,o.staff
  
      union
      select  pt.cid,k.department,o.hn,o.vn ,concat(pt.pname,pt.fname,' ',pt.lname) as names,o.pttype ,p.name as pttypes,o.vstdate,o.hospmain,h.name as hospname ,ou.name as staff_name,'มีการให้สิทที่มีสถานะ(ยกเลิกการใช้งาน)' as err
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
      GROUP BY  pt.cid,k.department,o.hn,o.vn,names,o.pttype,pttypes,o.vstdate,o.hospmain,hospname,staff_name,err,rent_id,o.staff
  
      union
      select  pt.cid,k.department,o.hn,o.vn ,concat(pt.pname,pt.fname,' ',pt.lname) as names,o.pttype ,p.name as pttypes,o.vstdate,o.hospmain,h.name as hospname ,ou.name as staff_name,'คนไข้สิทธิชำระเงินเองที่ออกโดยตู้ kios' as err
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
   GROUP BY  pt.cid,k.department,o.hn,o.vn,names,o.pttype,pttypes,o.vstdate,o.hospmain,hospname,staff_name,err,rent_id,o.staff
   ) x `;
    const values = [date1, date1];
    const results = await client.query(qeurytext, values);
    // ปิดการเชื่อมต่อ
    if (results == "") {
      res.status(404).json({ message: "No User found" });
    } else {
      res.status(200).json(results.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  } finally {
    await client.release();
  }
};

exports.tokenright = async (req, res, next) => {
  try {
    const client = await pgdb.connect();
    const qeurytext = `select cid ,token  from nhso_token where is_invalid='N' order by  update_datetime desc limit 1`;
    const results = await client.query(qeurytext);

    if (results == "") {
      res.status(404).json({ message: "No User found" });
    } else {
      res.status(200).json(results.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  } finally {
    await client.release();
  }
};
