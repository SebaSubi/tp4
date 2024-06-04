


export async function getAllNumbers() {
  try {
    const res = await fetch(`/api/numbers`, { cache: 'no-store' }) //Fetches the information, and sets the cache to no-store*
    if(!res.ok) {
      throw new Error("failed to fetch data")
    } 
    const data = await res.json()
    return data.number;
  } catch (error) {
    console.log("Error loading number", error)
  }
}


export async function getNumberById(id: string) {
  try {
    const res = await fetch(`/api/numbers/${id}`, { cache: 'no-store' }) 
    if(!res.ok) {
      throw new Error("failed to fetch data")
    } 
    const data = await res.json()
    return data.number;
  } catch (error) {
    console.log("Error loading number", error)
  }
}

export async function putNumber(number: number, id: string) {
  const res = await fetch(`/api/numbers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ number }),
  });
  const data = await res.json();

}

export async function postNumber(number: number, colour: string) {
  try {
    const res = await fetch("/api/numbers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",

      },
      body: JSON.stringify({ number, colour }) 
    });

    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteNumber(id: string) {
  try {
    await fetch(`/api/numbers?id=${id}`,
      {
        method: "DELETE"
      }
    )
  } catch (error) {
    console.log(error)
  }
}

//*By default, it will save the get in a cache, so, if another user updates it, and another
// does a get, he might not get the updated data, unless you do this.