const pgdb = require("../config/pgdb");
const getmy = require("../config/mydb");

exports.robot_VirusB = async (req, res, next) => {
  const { date1, cid } = req.body;
  const clients = await pgdb.getClient();
  try {
    const qeurytext = `SELECT lab_head.vn,
    lab_head.hn,
    p.cid,
    lab_order.lab_items_code,
    lab_head.lab_order_number,
    lab_order.lab_order_result,
    lab_items_sub_group.lab_items_sub_group_name,
    lab_order.lab_items_name_ref,
    lab_order.lab_items_normal_value_ref,
    lab_items.lab_items_unit,
    lab_items.range_check_min,
    lab_items.range_check_max,
    lab_items.range_check_min_female,
    lab_items.range_check_max_female,
    lab_head.department AS ldepartment,
    lab_head.order_date
  FROM lab_head
    LEFT JOIN lab_order ON lab_head.lab_order_number = lab_order.lab_order_number
    LEFT JOIN ovst o ON lab_head.vn = o.vn
    LEFT JOIN patient p ON lab_head.hn = p.hn
    LEFT JOIN lab_items_sub_group ON lab_order.lab_items_sub_group_code = lab_items_sub_group.lab_items_sub_group_code
    LEFT JOIN lab_items ON lab_order.lab_items_code = lab_items.lab_items_code
    LEFT JOIN ipt ON ipt.an = o.an
  WHERE lab_items.lab_items_code='5043' and  lab_head.confirm_report = 'Y' 
  and lab_head.order_date=$1 and p.cid=$2
  ORDER BY lab_items_sub_group.lab_items_sub_group_name,
    lab_items.display_order`;
    const values = [date1, cid];
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

exports.robot_UA = async (req, res, next) => {
  const { date1, cid } = req.body;
  const clients = await pgdb.getClient();
  try {
    const qeurytext = `	SELECT 
    lab_head.hn,
    p.cid,
    lab_head.lab_order_number,	
    lab_items_sub_group.lab_items_sub_group_name,
    lab_head.department AS ldepartment,
    (select  or1.lab_order_result from lab_order or1 where lab_head.lab_order_number=or1.lab_order_number and or1.lab_items_code='1756') as color,
    (select  or2.lab_order_result from lab_order or2 where lab_head.lab_order_number=or2.lab_order_number and or2.lab_items_code='124') as Appearance,
    (select  or3.lab_order_result from lab_order or3 where lab_head.lab_order_number=or3.lab_order_number and or3.lab_items_code='130') as proten,
    (select  or4.lab_order_result from lab_order or4 where lab_head.lab_order_number=or4.lab_order_number and or4.lab_items_code='209') as Glucose,
    (select  or5.lab_order_result from lab_order or5 where lab_head.lab_order_number=or5.lab_order_number and or5.lab_items_code='128') as Ketone,
    (select  or6.lab_order_result from lab_order or6 where lab_head.lab_order_number=or6.lab_order_number and or6.lab_items_code='443') as WBC,
    (select  or7.lab_order_result from lab_order or7 where lab_head.lab_order_number=or7.lab_order_number and or7.lab_items_code='442') as RBC
  FROM lab_head
    LEFT JOIN ovst o ON lab_head.vn = o.vn
    LEFT JOIN patient p ON lab_head.hn = p.hn
    LEFT JOIN ipt ON ipt.an = o.an
    LEFT JOIN lab_order  ON lab_head.lab_order_number = lab_order.lab_order_number  
    LEFT JOIN lab_items_sub_group ON lab_order.lab_items_sub_group_code = lab_items_sub_group.lab_items_sub_group_code
    LEFT JOIN lab_items ON lab_order.lab_items_code = lab_items.lab_items_code
    WHERE  lab_head.confirm_report = 'Y' and lab_items_sub_group.lab_items_sub_group_code='9'
    and lab_head.order_date=$1 and p.cid=$2
    and lab_items.lab_items_code in('1756','124','130','209','128','443','442') 
    GROUP BY  lab_head.hn,
    p.cid,lab_items_sub_group.lab_items_sub_group_name,
    lab_head.lab_order_number,
    lab_head.department`;
    const values = [date1, cid];
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

exports.robot_CBC = async (req, res, next) => {
  const { date1, cid } = req.body;
  const clients = await pgdb.getClient();
  try {
    const qeurytext = `	SELECT 
    lab_head.hn,
    p.cid,
    lab_head.lab_order_number,
    lab_items_sub_group.lab_items_sub_group_name,
    lab_head.department AS ldepartment,
    (select  or1.lab_order_result from lab_order or1 where lab_head.lab_order_number=or1.lab_order_number and or1.lab_items_code='2') as Hbdl,
    (select  or2.lab_order_result from lab_order or2 where lab_head.lab_order_number=or2.lab_order_number and or2.lab_items_code='49') as Hctmg,
    (select  or3.lab_order_result from lab_order or3 where lab_head.lab_order_number=or3.lab_order_number and or3.lab_items_code='5') as MCV,
    (select  or4.lab_order_result from lab_order or4 where lab_head.lab_order_number=or4.lab_order_number and or4.lab_items_code='294') as WBC,
    (select  or5.lab_order_result from lab_order or5 where lab_head.lab_order_number=or5.lab_order_number and or5.lab_items_code='9') as Plt,
    lab_items_sub_group.lab_items_sub_group_code
  FROM lab_head
    LEFT JOIN ovst o ON lab_head.vn = o.vn
    LEFT JOIN patient p ON lab_head.hn = p.hn
    LEFT JOIN ipt ON ipt.an = o.an
    LEFT JOIN lab_order  ON lab_head.lab_order_number = lab_order.lab_order_number  
    LEFT JOIN lab_items_sub_group ON lab_order.lab_items_sub_group_code = lab_items_sub_group.lab_items_sub_group_code
    LEFT JOIN lab_items ON lab_order.lab_items_code = lab_items.lab_items_code
    WHERE  lab_head.confirm_report = 'Y' and lab_items_sub_group.lab_items_sub_group_code='1'
    and lab_head.order_date=$1 and p.cid=$2
    and lab_items.lab_items_code in('2','49','5','294','9') 
    GROUP BY  lab_head.hn,lab_items_sub_group.lab_items_sub_group_code,
    p.cid,
    lab_head.lab_order_number,
    lab_head.department`;
    const values = [date1, cid];
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

exports.robot_CTN = async (req, res, next) => {
  const { date1, cid } = req.body;
  const clients = await pgdb.getClient();
  try {
    const qeurytext = `	SELECT 
    lab_head.hn,
    p.cid,
    lab_head.lab_order_number,
    lab_items_sub_group.lab_items_sub_group_name,
    lab_head.department AS ldepartment,
    (select  or1.lab_order_result from lab_order or1 where lab_head.lab_order_number=or1.lab_order_number and or1.lab_items_code='449') as creatinine,
    (select  or2.lab_order_result from lab_order or2 where lab_head.lab_order_number=or2.lab_order_number and or2.lab_items_code='450') as eGFR,
    lab_items_sub_group.lab_items_sub_group_code
  FROM lab_head
    LEFT JOIN ovst o ON lab_head.vn = o.vn
    LEFT JOIN patient p ON lab_head.hn = p.hn
    LEFT JOIN ipt ON ipt.an = o.an
    LEFT JOIN lab_order  ON lab_head.lab_order_number = lab_order.lab_order_number  
    LEFT JOIN lab_items_sub_group ON lab_order.lab_items_sub_group_code = lab_items_sub_group.lab_items_sub_group_code
    LEFT JOIN lab_items ON lab_order.lab_items_code = lab_items.lab_items_code
    WHERE  lab_head.confirm_report = 'Y' and lab_items_sub_group.lab_items_sub_group_code='23'
    and lab_head.order_date=$1 and p.cid=$2
    and lab_items.lab_items_code in('449','450') 
    GROUP BY  lab_head.hn,lab_items_sub_group.lab_items_sub_group_code,
    p.cid,
    lab_head.lab_order_number,
    lab_head.department`;
    const values = [date1, cid];
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

exports.robot_HDL = async (req, res, next) => {
  const { date1, cid } = req.body;
  const clients = await pgdb.getClient();
  try {
    const qeurytext = `	SELECT 
    lab_head.hn,
    p.cid,
    lab_head.lab_order_number,
    'Totalcholesterol and HDL' as lab_items_sub_group_name,
    lab_head.department AS ldepartment,
    (select  or1.lab_order_result from lab_order or1 where lab_head.lab_order_number=or1.lab_order_number and or1.lab_items_code='176') as total_cholesterol,
    (select  or2.lab_order_result from lab_order or2 where lab_head.lab_order_number=or2.lab_order_number and or2.lab_items_code='483') as HDL,
    lab_items_sub_group.lab_items_sub_group_code
  FROM lab_head
    LEFT JOIN ovst o ON lab_head.vn = o.vn
    LEFT JOIN patient p ON lab_head.hn = p.hn
    LEFT JOIN ipt ON ipt.an = o.an
    LEFT JOIN lab_order  ON lab_head.lab_order_number = lab_order.lab_order_number  
    LEFT JOIN lab_items_sub_group ON lab_order.lab_items_sub_group_code = lab_items_sub_group.lab_items_sub_group_code
    LEFT JOIN lab_items ON lab_order.lab_items_code = lab_items.lab_items_code
    WHERE  lab_head.confirm_report = 'Y' 
    and lab_head.order_date=$1 and p.cid=$2
    and lab_items.lab_items_code in('176','483') 
    GROUP BY  lab_head.hn,lab_items_sub_group.lab_items_sub_group_code,
    p.cid,
    lab_head.lab_order_number,
    lab_head.department`;
    const values = [date1, cid];
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

exports.robot_FPG = async (req, res, next) => {
  const { date1, cid } = req.body;
  const clients = await pgdb.getClient();
  try {
    const qeurytext = `SELECT lab_head.vn,
    lab_head.hn,
    p.cid,
   lab_order.lab_items_code,
    lab_head.lab_order_number,
     lab_order.lab_order_result,
     lab_items_sub_group.lab_items_sub_group_name,
    lab_order.lab_items_name_ref,
    lab_order.lab_items_normal_value_ref,
    lab_items.lab_items_unit,
    lab_items.range_check_min,
    lab_items.range_check_max,
    lab_items.range_check_min_female,
    lab_items.range_check_max_female,
    lab_head.department AS ldepartment,
    lab_head.order_date
    FROM lab_head
    LEFT JOIN lab_order ON lab_head.lab_order_number = lab_order.lab_order_number
    LEFT JOIN ovst o ON lab_head.vn = o.vn
    LEFT JOIN patient p ON lab_head.hn = p.hn
    LEFT JOIN lab_items_sub_group ON lab_order.lab_items_sub_group_code = lab_items_sub_group.lab_items_sub_group_code
    LEFT JOIN lab_items ON lab_order.lab_items_code = lab_items.lab_items_code
    LEFT JOIN ipt ON ipt.an = o.an
  WHERE 
  lab_items.lab_items_code='678' and  
  lab_head.confirm_report = 'Y' and
  lab_head.order_date=$1 and p.cid=$2
  ORDER BY lab_items_sub_group.lab_items_sub_group_name,
  lab_items.display_order`;
    const values = [date1, cid];
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
