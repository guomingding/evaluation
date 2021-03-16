const rfunctions = [
    {
        code:'longley_mutate = mutate(longley, people=Unemployed+Employed, .keep="unused")',
        name:'mutate',
        ref:'https://www.rdocumentation.org/packages/dplyr/versions/0.7.8/topics/mutate',
        inputTable:'longley',
        desc:"Create people from Unemployed+Employed and Delete Unemployed, Employed",
        glyph:"mutate.svg"
    },
    {
        code:'women_rbind = rbind(women, c(62, 130))',
        name:'rbind',
        ///////////
        ref:'https://www.rdocumentation.org/packages/dplyr/versions/0.7.8/topics/mutate',
        inputTable:'women',
        desc:"Create a row (62, 130)",
        glyph:"rbind.svg"
    },
    {
        code:"iris_rename = rename(iris, 'petal_length' = 'Petal.Length')",
        name:'rename',
        ref:'https://www.rdocumentation.org/packages/reshape/versions/0.8.8/topics/rename',
        inputTable:'iris',
        desc:"Rename Petal.Length to petal_length",
        glyph:"rename.svg"
    },
    {
        code:'trees_arrange = arrange(trees, -`Girth`)',
        name:'arrange',
        ref:'https://www.rdocumentation.org/packages/tidyft/versions/0.4.5/topics/arrange',
        inputTable:'trees',
        desc:"Sort rows by -Girth",
        glyph:"arrange.svg"
    },
    {
        code:'InsectSprays_unique = unique(InsectSprays)',
        name:'unique',
        ref:'https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/unique',
        inputTable:'InsectSprays',
        desc:"Remove duplicate rows",
        glyph:"unique.svg"
    },
    {
        code:"starwars_count = count(starwars, eye_color, name = 'num')",
        name:'count',
        ref:'https://www.rdocumentation.org/packages/plyr/versions/1.8.6/topics/count',
        inputTable:'starwars',
        desc:"Create num from COUNT(eye_color)",
        glyph:"count.svg"
    },
    {
        code:'airquality_subset = subset(airquality, Temp > 90 | Day == 3)',
        name:'subset',
        ref:'https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/subset',
        inputTable:'airquality',
        desc:"Keep rows where Temp > 90 or Day is 3",
        glyph:"subset.svg"
    },
    {
        code:'mtcars_summarise = summarise(mtcars, mean = mean(disp))',
        name:'summarise',
        ref:'https://www.rdocumentation.org/packages/spatsurv/versions/1.5/topics/Summarise',
        inputTable:'mtcars',
        desc:"Create mean from mean(disp)",
        glyph:"summarise.svg"
    },
    {
        code:"band_join = inner_join(band_members, band_instruments, by='name')",
        name:'inner_join',
        ref:'https://www.rdocumentation.org/packages/sparklyr/versions/1.6.0/topics/inner_join',
        inputTable:['band_members','band_instruments'],
        desc:"Inner join with band_members and band_instruments on name==name",
        glyph:"inner_join.svg"
    },
    {
        code:'CO2_separate = separate(CO2, uptake, into=c("int", "decimal"), sep="[.]")',
        name:'separate',
        ref:'https://www.rdocumentation.org/packages/sparklyr/versions/1.6.0/topics/separate',
        inputTable:'CO2',
        desc:`Split uptake on delimiters matching '.' into "int" and "decimal" columns`,
        glyph:"separate.svg"
    },
    {
        code:'beaver1_distinct = distinct(beaver1, day, activ)',
        name:'distinct',
        ref:'https://www.rdocumentation.org/packages/sparklyr/versions/1.6.0/topics/distinct',
        inputTable:'beaver1',
        desc:"Remove duplicate rows on day and activ",
        glyph:"distinct.svg"
    },
    {
        code:'fish_encounters_filter = filter(fish_encounters, station=="BCW", fish>4850)',
        name:'filter',
        ref:'https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/filter',
        inputTable:'fish_encounters',
        desc:`Keep rows where station is "BCW" and fish > 4850`,
        glyph:"filter.svg"
    },
    {
        code:'USArrests_select = select(USArrests, -2, -4)',
        name:'select',
        ref:'https://www.rdocumentation.org/packages/sparklyr/versions/1.6.0/topics/select',
        inputTable:'USArrests',
        desc:"Delete Assault, Rape",
        glyph:"select.svg"
    },
    {
        code:'table_merge = merge(table1, table2, by.x = "country", by.y = "country")',
        name:'merge',
        ref:'https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/merge',
        inputTable:['table1','table2'],
        desc:"Merge table1 and table2 on country==country",
        glyph:"merge.svg"
    },
    {
        code:'sleep_gather = gather(sleep, key=name, value=num, extra, group)',
        name:'gather',
        ///////////
        ref:'https://www.rdocumentation.org/packages/dplyr/versions/0.7.8/topics/mutate',
        inputTable:'sleep',
        desc:"Convert extra and group into rows",
        glyph:"gather.svg"
    }
]

export {rfunctions}