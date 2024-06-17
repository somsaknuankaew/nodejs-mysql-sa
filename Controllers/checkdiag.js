const pgdb = require("../config/pgdb");

exports.z100 = async (req, res, next) => {
  const { token, date1, date2 } = req.body;
  try {
    const qeurytext = `select  o.vstdate,p.cid,oq.seq_id,o.hn,o.vsttime,o.vn,
    cast(concat(p.pname,p.fname,' ',p.lname) as varchar(250))  as ptname  ,
    t.name as pttype_name ,o.pttypeno,v.pdx,  i.name as pdx_name,o.finance_lock,o.oqueue
     from ovst o  left
        outer join vn_stat v   on v.vn = o.vn  
       left outer join opdscreen oc  on oc.vn = o.vn 
        left outer join patient p  on p.hn = o.hn  
        left outer join pttype t on t.pttype = o.pttype 
         left outer join icd101 i on i.code = v.pdx  
         left outer join spclty s on s.spclty = o.spclty  
         left outer join ovstist sti on sti.ovstist = o.ovstist 
          left outer join ovstost st on st.ovstost = o.ovstost  
          left outer join ovst_seq oq on oq.vn = o.vn  
          left outer join opduser ou1 on ou1.loginname = oq.pttype_check_staff 
           left outer join ovst_nhso_send oo1 on oo1.vn = o.vn 
            left outer join kskdepartment k on k.depcode = o.cur_dep  
            left outer join kskdepartment k2 on k2.depcode = oq.register_depcode  
            left outer join kskdepartment kk3 on kk3.depcode = o.main_dep 
             left outer join hospital_department hd on hd.id = oq.hospital_department_id  
             left outer join sub_spclty ssp on ssp.sub_spclty_id = oq.sub_spclty_id  
             left outer join pt_walk pw on pw.walk_id = oc.walk_id  
             left outer join patient_opd_file pf on pf.hn = o.hn  
             left outer join kskdepartment k3 on k3.depcode = pf.last_depcode  
             left outer join visit_type vt on vt.visit_type = o.visit_type 
              left outer join ipt i3  on i3.vn = o.vn  
              left outer join opduser ou on ou.loginname = o.staff 
              left outer join visit_pttype vpt on vpt.vn = o.vn and vpt.pttype = o.pttype 
              where o.vstdate between $1 and $2   
              and o.pttype in('42','67' )
              and (o.anonymous_visit is null or o.anonymous_visit = 'N') and v.pdx is null and i3.an is null
              order by o.vn`;
    const values = [date1, date2];
    const results = await pgdb.query(qeurytext, values);
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

exports.z000 = async (req, res, next) => {
  const { token, date1, date2 } = req.body;
  try {
    const qeurytext = `select  o.hn,o.vn,o.vstdate,p.cid,oq.seq_id,o.vsttime,v.pdx,i.name as pdx_name,o.finance_lock,o.oqueue,i3.an,main_dep
    from ovst o 
    left outer join vn_stat v   on v.vn = o.vn  
      left outer join patient p  on p.hn = o.hn  
      left outer join pttype t on t.pttype = o.pttype 
      left outer join icd101 i on i.code = v.pdx  
      left outer join spclty s on s.spclty = o.spclty  
      left outer join ovstist sti on sti.ovstist = o.ovstist 
      left outer join ovstost st on st.ovstost = o.ovstost  
      left outer join ovst_seq oq on oq.vn = o.vn  
      left outer join ipt i3  on i3.vn = o.vn  
      where  main_dep='871'
      and o.vstdate between $1 and $2   
      and o.pttype in('41','42','67','R4')
       and (v.pdx is null or v.pdx = '') and (i3.an is null or i3.an='')
      order by o.vn`;
    const values = [date1, date2];
    const results = await pgdb.query(qeurytext, values);
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

exports.z653 = async (req, res, next) => {
  const { token, date1, date2 } = req.body;
  try {
    const qeurytext = `select  o.hn,o.vn,o.vstdate,p.cid,oq.seq_id,o.vsttime,v.pdx,i.name as pdx_name,o.finance_lock,o.oqueue,i3.an
    from ovst o
     inner join opitemrece o1 on o1.vn=o.vn 	
      left outer join vn_stat v   on v.vn = o.vn  
      left outer join patient p  on p.hn = o.hn  
      left outer join pttype t on t.pttype = o.pttype 
      left outer join icd101 i on i.code = v.pdx  
      left outer join spclty s on s.spclty = o.spclty  
      left outer join ovstist sti on sti.ovstist = o.ovstist 
      left outer join ovstost st on st.ovstost = o.ovstost  
      left outer join ovst_seq oq on oq.vn = o.vn  
      left outer join ipt i3  on i3.vn = o.vn  
      where o.vstdate between $1 and $2   
      and o1.icode='3031168'	
      and o.pttype in('44')
     and (v.pdx is null or v.pdx = '') and (i3.an is null or i3.an='')
      order by o.vn`;
    const values = [date1, date2];
    const results = await pgdb.query(qeurytext, values);
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

exports.n185 = async (req, res, next) => {
  const { token, date1, date2 } = req.body;
  try {
    const qeurytext = `select  o.hn,o.vn,o.vstdate,p.cid,oq.seq_id,o.vsttime,v.pdx,i.name as pdx_name,o.finance_lock,o.oqueue,i3.an
    from ovst o
     inner join opitemrece o1 on o1.vn=o.vn 	
      left outer join vn_stat v   on v.vn = o.vn  
      left outer join patient p  on p.hn = o.hn  
      left outer join pttype t on t.pttype = o.pttype 
      left outer join icd101 i on i.code = v.pdx  
      left outer join spclty s on s.spclty = o.spclty  
      left outer join ovstist sti on sti.ovstist = o.ovstist 
      left outer join ovstost st on st.ovstost = o.ovstost  
      left outer join ovst_seq oq on oq.vn = o.vn  
      left outer join ipt i3  on i3.vn = o.vn  
      where o.vstdate between $1 and $2   
      and o1.icode='3031168'	
      and o.pttype in('44')
     and (v.pdx is null or v.pdx = '') and (i3.an is null or i3.an='')
      order by o.vn`;
    const values = [date1, date2];
    const results = await pgdb.query(qeurytext, values);
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

exports.z368 = async (req, res, next) => {
  const { token, date1, date2 } = req.body;
  try {
    const qeurytext = `select  o.hn,o.vn,o.vstdate,p.cid,oq.seq_id,o.vsttime,v.pdx,i.name as pdx_name,o.finance_lock,o.oqueue,i3.an
    from ovst o
     inner join opitemrece o1 on o1.vn=o.vn 	
      left outer join vn_stat v   on v.vn = o.vn  
      left outer join patient p  on p.hn = o.hn  
      left outer join pttype t on t.pttype = o.pttype 
      left outer join icd101 i on i.code = v.pdx  
      left outer join spclty s on s.spclty = o.spclty  
      left outer join ovstist sti on sti.ovstist = o.ovstist 
      left outer join ovstost st on st.ovstost = o.ovstost  
      left outer join ovst_seq oq on oq.vn = o.vn  
      left outer join ipt i3  on i3.vn = o.vn  
      where o.vstdate between $1 and $2   
      and o1.icode='3031168'	
      and o.pttype in('44')
     and (v.pdx is null or v.pdx = '') and (i3.an is null or i3.an='')
      order by o.vn`;
    const values = [date1, date2];
    const results = await pgdb.query(qeurytext, values);
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
