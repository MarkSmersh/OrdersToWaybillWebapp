import type { Query } from "@/types";

export function fromRawData (raw: Query["billingData"][keyof Query["billingData"]]) {
    let data = [] as { id: number | string, name: string }[];
    raw.data.forEach((d, i) => {
      data.push({
        id: i,
        name: d
      })
    })

    let selectData = data.find((v) => v.name == raw.selected) as { id: number | string, name: string };
    
    return {
        data: data,
        selected: {
            id: selectData.id,
            name: selectData.name
        }
    } 
}