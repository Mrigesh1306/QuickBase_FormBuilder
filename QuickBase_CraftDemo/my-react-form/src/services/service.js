const service = async (data) => {
    console.log(data);
    const res = await fetch("http://www.mocky.io/v2/566061f21200008e3aabd919", {
        method : 'POST',
        body :JSON.stringify(data),
        headers : {
            "content-type": "application/json"
        }
       
    });

    return await res.json();
}

export default service;
