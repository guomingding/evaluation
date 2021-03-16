const rscripts = [
    {
        // rscript:"library(dplyr)\nwarpbreaks = read.csv(\"warpbreaks.csv\")\nwarpbreaks = unique(warpbreaks)\nwb_tens = rename(warpbreaks, tens=tension)\nwb_tens = group_by(wb_tens, tens)\nwb_tens = mutate(wb_tens, count = n())\nwb_tens = ungroup(wb_tens)\nwb_tens_r = mutate(wb_tens, rate=breaks/count)\nwb_l = rbind(warpbreaks, list(70, 'A', 'L'))\nwb_sort = arrange(wb_l, -breaks)",
        functions:{
            name:['read.csv','unique','rename','group_by','mutate','ungroup','rbind','arrange'],
            refs:[
                ///////////
                'https://www.rdocumentation.org/packages/dplyr/versions/0.7.8/topics/mutate',
                'https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/unique',
                'https://www.rdocumentation.org/packages/reshape/versions/0.8.8/topics/rename',
                'https://www.rdocumentation.org/packages/ggvis/versions/0.4.7/topics/group_by',
                'https://www.rdocumentation.org/packages/plyr/versions/1.8.6/topics/mutate',
                'https://www.rdocumentation.org/packages/tidylog/versions/1.0.2/topics/ungroup',
                //////////
                'https://www.rdocumentation.org/packages/dplyr/versions/0.7.8/topics/mutate',
                'https://www.rdocumentation.org/packages/plyr/versions/1.8.6/topics/arrange',
            ]
        },
        desc:"a description of script",
        glyph:"program_training.svg"
    },
    {
        functions:{
            name:['read.csv','count','subset','group_by','summarise','sum','inner_join','rename','mutate'],
            refs:[
                //////////
                'https://www.rdocumentation.org/packages/dplyr/versions/0.7.8/topics/mutate',
                'https://www.rdocumentation.org/packages/plyr/versions/1.8.6/topics/count',
                'https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/subset',
                'https://www.rdocumentation.org/packages/ggvis/versions/0.4.7/topics/group_by',
                'https://www.rdocumentation.org/packages/spatsurv/versions/1.5/topics/Summarise',
                'https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/sum',
                'https://www.rdocumentation.org/packages/sparklyr/versions/1.6.0/topics/inner_join',
                'https://www.rdocumentation.org/packages/reshape/versions/0.8.8/topics/rename',
                'https://www.rdocumentation.org/packages/dplyr/versions/0.7.8/topics/mutate',
            ]
        },
        desc:"a description of script",
        glyph:"program_task1.svg"
    },
    {
        functions:{
            name:['read.csv','distinct','group_by','mutate','row_number','filter','select','merge'],
            refs:[
                ///////
                'https://www.rdocumentation.org/packages/dplyr/versions/0.7.8/topics/mutate',
                'https://www.rdocumentation.org/packages/sparklyr/versions/1.6.0/topics/distinct',
                'https://www.rdocumentation.org/packages/ggvis/versions/0.4.7/topics/group_by',
                'https://www.rdocumentation.org/packages/dplyr/versions/0.7.8/topics/mutate',
                'https://www.rdocumentation.org/packages/tidytable/versions/0.5.9/topics/row_number.',
                'https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/filter',
                'https://www.rdocumentation.org/packages/sparklyr/versions/1.6.0/topics/select',
                'https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/merge',
            ]
        },
        desc:"a description of script",
        glyph:"program_task2.svg"
    }
]

export {rscripts}