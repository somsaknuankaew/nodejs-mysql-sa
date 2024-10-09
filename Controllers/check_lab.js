const pgdb = require("../config/pgdb");
const getmy = require("../config/mydb");

exports.robot_UA = async (req, res, next) => {
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
