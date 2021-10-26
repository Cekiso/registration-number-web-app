// const { query } = require("express");
module.exports = function Reg(pool) {


    // var regList = {}


    // async function add(regNumber) {
    // const sql = await pool.query(`SELECT * FROM regnumbers WHERE registration = $1`, [regNumber])
    // const sql = await pool.query(`SELECT registration FROM regnumbers  WHERE  registration_id = $1`, [regNumber]);
    // console.log(sql.rows);
    // return sql;


    // if (sql.rows.length == 0) {
    //     await pool.query(`INSERT INTO regnumbers ( registration , registration ) values ($1, $2)`, [regNumber, 1])


    // }
    // }

    // async function get() {
    //     const getSql = await pool.query(`SELECT * FROM regnumbers`)
    //     return getSql.rows;
    // }


    async function regTake(regNumber) {
        // const contain =regNumbers.substring(0, 2)

        const addcase = regNumber.toUpperCase()
        let intake = await pool.query(`SELECT registration  FROM regnumbers WHERE registration = $1`, [addcase]);
        if (intake.rows.length == 0) {
            await pool.query(`INSERT INTO regnumbers ( registration ) values ($1)`, [addcase])


        }


    }

    async function showReg() {
        let get = await pool.query(`SELECT registration FROM regnumbers`);
        return get.rows;
    }


    // function it filters based on the town selected

    // function number(code) {
    //     //errorhandling(code)
    //     var allList = [];
    //     var i;
    //     for (i = 0; i < regList.length; i++) {
    //         if (regList[i].includes(code) && !allList.includes(regList[i])) {
    //             allList.push(regList[i])

    //             //return regList[i];
    //         } else if (code == 'ShowAll') {
    //             return regList;
    //         }
    //     }
    //     return allList;

    // }


    //a function where by i set my RegNo in the input field
    // async function setReg(regNumber) {
    //     error(regNumber)
    //     var dash = /^((CA|CJ|GP)\ ([0-9]){3}\ ([0-9]){3})$/;
    //     var dash1 = /^((CA|CJ|GP)\ ([0-9]){6})$/;
    //     var dash2 = /^((CA|CJ|GP)\ ([0-9]){5})$/;

    //     var dash3 = /^((CA|CJ|GP)\ ([0-9]){3}\-([0-9]){3})$/;
    //     var dash4 = /^((CA|CJ|GP)\ ([0-9]){6})$/;
    //     var dash5 = /^((CA|CJ|GP)\ ([0-9]){5})$/;
    //     if (dash.test(regNumber.toUpperCase()) || dash1.test(regNumber.toUpperCase()) || dash2.test(regNumber.toUpperCase()) || dash3.test(regNumber.toUpperCase()) || dash4.test(regNumber.toUpperCase()) || dash5.test(regNumber.toUpperCase())) {
    //         if (!regList.includes(regNumber.toUpperCase()) && regNumber != "") {
    //             regList.push(regNumber.toUpperCase());
    //         } else {
    //             return;
    //         }


    //     } else {
    //         return
    //     }

    // }

    // function error(regNumber) {
    //     var dash = /^((CA|CJ|GP)\ ([0-9]){3}\ ([0-9]){3})$/;
    //     var dash1 = /^((CA|CJ|GP)\ ([0-9]){6})$/;
    //     var dash2 = /^((CA|CJ|GP)\ ([0-9]){5})$/;

    //     var dash3 = /^((CA|CJ|GP)\ ([0-9]){3}\-([0-9]){3})$/;
    //     var dash4 = /^((CA|CJ|GP)\ ([0-9]){6})$/;
    //     var dash5 = /^((CA|CJ|GP)\ ([0-9]){5})$/;
    //     if (dash.test(regNumber.toUpperCase()) || dash1.test(regNumber.toUpperCase()) || dash2.test(regNumber.toUpperCase()) || dash3.test(regNumber.toUpperCase()) || dash4.test(regNumber.toUpperCase()) || dash5.test(regNumber.toUpperCase())) {
    //         if (!regList.includes(regNumber.toUpperCase()) && regNumber != "")

    //             return null;
    //     } else {
    //         return "Please enter a valid registration number e.g CA XXX XXX";
    //     }
    // }

    // function errorhandling(code) {
    //     //if (regList.includes(code) && !allList.includes(code)) {
    //     if (number(code).length == 0) {
    //         console.log(number(code))
    //         return "No registration number added";
    //     } else {
    //         return null
    //     }
    // }





    // function Names() {
    //     //console.log(regList);
    //     return regList;

    // }

    //delete button
    async function clear() {
        try {
            await pool.query(`DELETE FROM regnumbers`);
        } catch (error) {
            console.log(error)
        }

    }


    return {
        // number,
        // setReg,
        // Names,
        // error,
        // errorhandling,
        // add,
        // get,
        regTake,
        showReg,
        clear

    }
}