let's see the contents of our database.

<!--
    var records = await getAllRecords();

    if(records && records.length > 0) {
        // TODO: print the contents of the array
        console.table(records);
        return;
    }
-->


<!--
    async function getAllRecords() {
        var result = await SQL3.all(
            `
                SELECT
                    Other.data AS 'other',
                    Something.data AS 'something'
                FROM
                    Something JOIN Other
                    ON (Something.otherID = Other.id)
                ORDER BY
                    Other.id DESC, Something.data ASC
            `
        );

        if (result && result.length > 0) {
            return result;
        }
    }
-->

<!-- TERMINAL -->
> node ex2.js --other=sneijder

<!--
    OUTPUT:
        Success!
        ┌─────────┬────────────┬───────────┐
        │ (index) │   other    │ something │
        ├─────────┼────────────┼───────────┤
        │    0    │ 'sneijder' │ 444653386 │
        └─────────┴────────────┴───────────┘
-->

<!-- TERMINAL -->
> node ex2.js --other=sneijder
<!--
    OUTPUT:
        Success!
        ┌─────────┬────────────┬───────────┐
        │ (index) │   other    │ something │
        ├─────────┼────────────┼───────────┤
        │    0    │ 'sneijder' │  1286320  │
        │    1    │ 'sneijder' │ 444653386 │
        └─────────┴────────────┴───────────┘  
-->

<!-- TERMINAL -->
> node ex2.js --other=nainggolan
<!--
    OUTPUT:
        Success!
        ┌─────────┬──────────────┬───────────┐
        │ (index) │    other     │ something │
        ├─────────┼──────────────┼───────────┤
        │    0    │ 'nainggolan' │ 324989035 │
        │    1    │  'sneijder'  │  1286320  │
        │    2    │  'sneijder'  │ 444653386 │
        └─────────┴──────────────┴───────────┘
-->
