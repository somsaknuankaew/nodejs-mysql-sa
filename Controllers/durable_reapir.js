const pgdb = require("../config/pgdb");
exports.repairbyid = async (req, res, next) => {
 //const { idrepair} = req.body;
  const idrepair = req.params.id;
  const clients = await pgdb.getClient();
  try {
    const qeurytext = `SELECT ir.inv_durable_good_repair_id,
case 
when ir.inv_durable_good_evl_type_id=1 then 'ซ่อมได้'
when ir.inv_durable_good_evl_type_id=3 then 'ซ่อมไม่ได้'
when ir.inv_durable_good_rep_eval_chk1='Y' then 'เบิกวัสดุในคลัง'
when ir.inv_durable_good_rep_eval_chk2='Y' then 'ขอจัดซื้อวัสดุ'
when ir.inv_durable_good_rep_eval_chk3='Y' then 'เห็นควรจ้างเอกชน'
when ir.inv_durable_good_rep_eval_chk4='Y' then 'เห็นควรแทงชำรุด'
end as repair_cause_result,
dg.inv_durable_good_code,
  dg.inv_durable_good_name,
	rs.inv_durable_good_rstatus_name,
  dgc.inv_durable_good_category_name,
  dgt.inv_durable_good_type_name,
  dg.inv_durable_good_price_cost,
  dg.inv_durable_good_recieve_date,
  dgs.inv_durable_good_status_name,
  dg.inv_durable_good_depic_year,
  dgb.inv_durable_good_budgeter_name,  
   dg.insurance_expire,
  ed.emp_dep_name,
  igr.inv_durable_good_repairer_name,
  ir.inv_durable_good_repair_id,
  ir.inv_durable_good_repair_date,
  ir.inv_durable_good_repair_bdate,
  ir.inv_durable_good_repair_price,
  ir.inv_durable_good_repair_desc,
  Concat(ep.emp_prename_name, '', e.emp_first_name, ' ', e.emp_last_name) AS Pname,
  ed.emp_dep_id,
  dg.inv_durable_good_id,
  Concat(ep1.emp_prename_name, '', e1.emp_first_name, ' ', e1.emp_last_name) AS approve_name,
  id.inv_dep_name, 
  ir.inv_dep_id AS inv_dep_id1,       
  ir.inv_durable_good_repair_cause       
  ,ir.*                                                        
FROM inv_durable_good dg
  LEFT JOIN inv_durable_good_type dgt ON dg.inv_durable_good_type_id = dgt.inv_durable_good_type_id
  LEFT JOIN inv_durable_good_category dgc ON dg.inv_durable_good_category_id = dgc.inv_durable_good_category_id
  LEFT JOIN inv_durable_good_status dgs ON dg.inv_durable_good_status_id = dgs.inv_durable_good_status_id
  LEFT JOIN inv_durable_good_budgeter dgb ON dg.inv_durable_good_budgeter_id = dgb.inv_durable_good_budgeter_id
  LEFT JOIN inv_durable_good_repair ir ON dg.inv_durable_good_id = ir.inv_durable_good_id
  left join inv_durable_good_repair_status rs on rs.inv_durable_good_rstatus_id=ir.inv_durable_good_rstatus_id
	LEFT JOIN emp e ON ir.emp_id = e.emp_id
  LEFT JOIN emp_prename ep ON e.emp_prename_id = ep.emp_prename_id
  LEFT JOIN emp_dep ed ON ir.emp_dep_id = ed.emp_dep_id
  LEFT JOIN inv_durable_good_repairer igr ON ir.inv_durable_good_repairer_id = igr.inv_durable_good_repairer_id
  LEFT JOIN emp e1 ON e1.emp_id = ir.inv_durable_good_eval_emp_id
  LEFT JOIN emp_prename ep1 ON e1.emp_prename_id = ep1.emp_prename_id
  LEFT JOIN inv_dep id ON id.inv_dep_id = ir.inv_dep_id
WHERE ir.inv_durable_good_repair_id = $1
ORDER BY dg.inv_durable_good_id`;
    const values = [idrepair];
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

exports.repairlist = async (req, res, next) => {
    //const { idrepair} = req.body;
     const durableid = req.params.durableid;
     const clients = await pgdb.getClient();
     try {
       const qeurytext = `select dr.inv_durable_good_repair_id,
dr.inv_durable_good_id,
rs.inv_durable_good_rstatus_name,  
drt.inv_durable_good_repairer_name,
dr.inv_durable_good_repair_cause,
dr.inv_durable_good_apprv_status,
dr.inv_durable_good_apprv_date,
dr.last_update,
substr(concat(pn.emp_prename_name,e.emp_first_name,' ',e.emp_last_name),1,255)  as empname,
edd.emp_dep_name as emp_dep_name_repair,dr.inv_durable_good_repair_date,
dr.inv_durable_good_repair_staff,o.name as insfname
 --, dr.*
from inv_durable_good_repair dr 
  left join inv_durable_good_repairer drt on drt.inv_durable_good_repairer_id = dr.inv_durable_good_repairer_id 
  left join emp e on e.emp_id = dr.emp_id  
  left join emp_prename pn on e.emp_prename_id = pn.emp_prename_id  
  left join emp_dep edd on edd.emp_dep_id = dr.emp_dep_id
  left join opduser o on o.loginname = dr.inv_durable_good_repair_staff 
	left join inv_durable_good_repair_status rs on rs.inv_durable_good_rstatus_id=dr.inv_durable_good_rstatus_id
 where dr.inv_durable_good_id = $1 
 order by  dr.inv_durable_good_repair_date desc`;
       const values = [durableid];
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




/* exports.repairsearch = async (req, res, next) => {
    const { searchcode,searchname} = req.body;
    // const durableid = req.params.durableid;
     const clients = await pgdb.getClient();
     try {
       const qeurytext = `qury1`;

       const values = [durableid];
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
   }; */