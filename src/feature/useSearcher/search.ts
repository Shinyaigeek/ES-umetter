import { Template } from "../../components/TemplateList";

export const searcher = (target: Template[], query: string) => {
    const queries = queryParser(query);

}

interface Query {
    or: string[],
    and: string[]
}

const queryParser = (query: string) => {
    // TODO I should parse not only or and , but also nor and nand
    const queries = query.split(" ")
    const res: Query = {
        or: [],
        and: []
    }

    queries.forEach(query => {
        if (query[0] === `"` && query[query.length - 1] === `"`) {
            res.and.push(query.slice(1, query.length - 1))
        } else {
            // or
            res.or.push(query)
        }
    })
}

const pickTemplate = (target: Template[], query: Query) => {
    const res = [] as Template[];

    target.forEach
}

export const orPick = (target: Template[], keywords: string[]) => {
    return target.filter(tar => {
        keywords.forEach(keyword => {
            if (tar.label.includes(keyword)) {
                return tar
            }
        })
    })
}
