(function(){
    window.onload = function(){
        console.log("hey");


        //console.log(triBicolorTiling(100, 2, 3, 4));

        //pascal = makeModdedPascalTriable(100,12345787);

        //console.log(pascal[50][4]);

        let prime = 12345787;

        // idea calculate array of a in 1 to 100
        // a^(prime-2) mod prime
        // see how long this takes
        function genFermatLittleArray(n){
            console.log("start");
            let result = [];
            result[0] = 1;
            result[1] = 1;
            for(let i = 2; i <= n; i++){
                let c = 1;
                for(let e = 1; e <= (prime - 2); e++){
                    c = safeMultiply(c,i);
                }
                result[i] = c;
            }
            console.log("end");
            return result;
        }

        // make sure that when we multiply two numbers that we don't have any overflow
        // and that we do a sort of modded multiplication
        // might need to change this to (a*b)%prime
        // (a % prime) * (b % prime) ) % prime might be too much
        function safeMultiply(a, b){
            return ( a * b ) % prime
        }

        let fermatLittleArray = genFermatLittleArray(100);



        function triBicolorTiling(n, r, g, b) {
            // Your Code Here

            // some variables to use (globals)
             // for easy modding

            let pascal = makeModdedPascalTriable(100,prime); // modded binomial coefficients

            let bigResult = 0; // what the result should be

            let tiles = [r,g,b]; // keep the lengths organized

            // start function definitions

            // finds and generates larger cases
            // of posible number of each tile and empty spaces
            // tileOne is the length of the tile
            // tileTwo is the length of the tile
            // myN is the length of available spaces
            function generateLargeCases(myN, tileOne, tileTwo){
                result = [];
                let maxOne = Math.floor(myN/tileOne);
                let maxTwo = Math.floor(myN/tileTwo);
                for(let iOne = 1; iOne <= maxOne; iOne++){
                    for(let iTwo = 1; iTwo <= maxTwo; iTwo++){
                        if( (iOne*tileOne + iTwo*tileTwo) <= myN){
                            result.push([iOne,iTwo,myN-(iOne*tileOne + iTwo*tileTwo)]);
                        }
                        else{
                            break;
                        }
                    }
                }
                return result;
            }

            // for this solution calculating binomial coeficients can be larger
            // than the MAX_SAFE_INTEGER
            // to get around this
            // will populate a pascal triangle modding the entries as we go
            // this will result in modulus of binomial coeficients
            function makeModdedPascalTriable(n,mod){
                let result = [];
                // every row will have a trailing zero for (reasons :-) )
                result.push([1,0]);

                for(let i = 1; i <= n; i++){
                    result.push([]);
                    result[i] = new Array(i+2).fill(0);
                    result[i][0] = 1;

                    for(let j = 1; j <= i; j++){
                        result[i][j] = ( result[i-1][j] + result[i-1][j-1] ) % mod;
                    }

                }
                return result;
            }

            // calculates combination (binomial coeficient)
            // myN!/[myR!*(myN-myR)!]
            // "ancient" indian algorithm :-)
            // need to change this to modular combination
            // change this function to us Fermat's Little Theorem calculations 
            function combination(myN,myR){
                if((myN-myR) < myR){
                    myR = myN-myR;
                }
                let result = 1;
                for(let i = 0; i < myR; i++){
                    result = result*(myN-i);
                    result = result/(i+1);
                }
                return result;
            }

            // calculates multinomial coeficient
            // n!/(n1!*n2!...)
            // where kBar = [n1,n2, ... ]
            // and n = n1 + n2 + ...
            // calculates by a sort of telescoping expansion
            function multCombination(kBar){
                let result = 1;
                let numerator = 0;
                for(let i = 0; i < kBar.length; i++){
                    numerator = numerator + kBar[i];
                    result = safeMultiply(result,pascal[numerator][kBar[i]]);
                }
                console.log(result);
                return result;
            }






            console.log(n + " " + tiles);
            // iterate over all posible two selections of tiles
            for(let i = 0; i < (tiles.length - 1); i++){
                for(let j = i+1; j < tiles.length; j++){
                    let tempCases = generateLargeCases(n, tiles[i], tiles[j]);
                    for(let k = 0; k < tempCases.length; k++){
                        bigResult = bigResult + (multCombination(tempCases[k]) % prime);
                        bigResult = bigResult % prime;
                    }
                }
            }

            return bigResult;
        }
        


    };
})();