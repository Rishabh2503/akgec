#include <bits/stdc++.h>
using namespace std;


  bool isprime(int num){
       if(num<=1)
       return false;
       for(int i=2;i*i<=num ;i++){
           if(num%i==0)
           return false;
       }
       return true;
   }
   
int main() {
   int n;
   cin>>n;
   int arr[n];
   for(int i=0;i<n;i++){
       cin>>arr[i];
   }
   
 
   
   vector<int>vec;
   for(int i=0;i<n;i++){
       if(isprime(arr[i])==true)
       vec.push_back(arr[i]);
   }
   sort(vec.begin(),vec.end());
   vector<int>res;
   int a=vec[vec.size()-1];
   res.push_back(vec[vec.size()-1]);
   int b=vec[0];
   for(int i=0;i<n;i++){
       if(arr[i]!=a && arr[i]!=b)
       res.push_back(arr[i]);
   }
   
   res.push_back(vec[0]);
   sort(res.begin()+1,res.begin()+res.size()-2,greater<int>());
   for(int i=0;i<res.size();i++){
       cout<<res[i]<<" ";
   }
   

    return 0;
}
