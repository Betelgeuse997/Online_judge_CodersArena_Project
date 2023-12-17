const stubs = {};

stubs.cpp = `#include<stdio.h>
#include<iostream>

int main(){

printf("Hello_World");

return 0;
}
`;


stubs.py = `print("Hello World!")`;

stubs.java = `import java.util.*;
import java.lang.*;
import java.io.*;

/* Name of the class has to be "Main" only if the class is public. */
class Main
{
	public static void main (String[] args) throws java.lang.Exception
	{
		// your code goes here
	}
}
`;

export default stubs;